import {
	Component,
	Input,
	ContentChildren,
	OnInit,
	Output,
	QueryList,
	AfterContentInit,
	EventEmitter,
	ContentChild
} from '@angular/core';
import {
	CellDirective,
	SortDirective,
	ActionsDirective,
	CustomEditDirective
} from './table.directive';
import { Router } from '@angular/router';
import { StoreService } from 'wacom';

/**
 * TableComponent is a reusable component for displaying data in a table format with
 * features like sorting, pagination, search, and custom action buttons.
 */
@Component({
    selector: 'wtable',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent implements OnInit, AfterContentInit {
	constructor(private _router: Router, private _store: StoreService) {}

	/** A unique ID for the table based on the current route. */
	tableId =
		'table_' +
		this._router.url
			.split('/')
			.filter((p) => p && p.length !== 24)
			.join('/');

	/** Configuration object for the table. */
	@Input() config: any = {};

	/** List of columns to display in the table. */
	@Input() columns: any = [];

	/** List of rows (data) to display in the table. */
	@Input() rows: any = [];

	/** The value field used as the key for each row. */
	@Input() value = '_id';

	/** Title of the table. */
	@Input() title = '';

	/** Directives for custom cell templates. */
	@ContentChildren(CellDirective) cell: QueryList<CellDirective>;

	/** Directives for sortable columns. */
	@ContentChildren(SortDirective) sortHeaders: QueryList<SortDirective>;

	/** Directive for custom action buttons. */
	@ContentChild(ActionsDirective, { static: false }) action: any;

	/** Directive for custom edit form. */
	@ContentChild(CustomEditDirective, { static: false }) editForm: any;

	/** Current timestamp to force table refresh. */
	now = Date.now();

	/** Whether the search input is visible. */
	searchShow = false;

	/** Text entered in the search input. */
	searching_text = '';

	/** Filter for search functionality. */
	filter_filter = '';

	/** Event emitted when a search is performed. */
	@Output() onSearch = new EventEmitter();

	private _search_timeout: any;

	/** Custom cell templates keyed by column field. */
	custom_cell: any = {};

	/** Object containing the sort state for each column. */
	sort_type: any = {};

	/** Object containing the sortable state for each column. */
	sortable: any = {};

	ngOnInit(): void {
		this.default_config();

		// Initialize columns
		for (let i = 0; i < this.columns.length; i++) {
			if (typeof this.columns[i] === 'string') {
				this.columns[i] = {
					title: this.columns[i],
					field: this.columns[i]
				};
			}
		}

		// Restore the perPage value from the store if available
		this._store.get(this.tableId + 'perPage', (perPage) => {
			if (perPage) {
				this.changePerPage(Number(perPage));
			}
		});
	}

	/** Sets the default configuration for the table if not provided. */
	default_config(): void {
		if (!this.config.pageSizeOptions) {
			this.config.pageSizeOptions = [1, 10, 20, 50];
		}

		if (!this.config.perPage) {
			this.config.perPage = -1;
		}

		if (!this.config.page) {
			this.config.page = 1;
		}

		if (!this.config.searchable) {
			this.config.searchable = false;
		}

		if (typeof this.config.allDocs !== 'boolean') {
			this.config.allDocs = true;
		}
	}

	ngAfterContentInit(): void {
		// Initialize sortable headers
		for (let i = 0; i < this.sortHeaders.toArray().length; i++) {
			this.sortable[this.sortHeaders.toArray()[i].cell] = true;
		}

		// Initialize custom cells
		for (let i = 0; i < this.cell.toArray().length; i++) {
			const cell = this.cell.toArray()[i];
			this.custom_cell[cell.cell] = cell.template;
		}

		// Refresh the table periodically
		const interval = setInterval(() => {
			this.refresh();
		}, 1000);
		setTimeout(() => {
			clearInterval(interval);
		}, 20000);
	}

	/** Refreshes the table by updating the current timestamp. */
	refresh() {
		this.now = Date.now();
	}

	/** Handles search input changes with a delay. */
	searching() {
		setTimeout(() => {
			if (!this.config.globalSearch) {
				this.filter_filter = this.searching_text;
			}
		}, 100);
		clearTimeout(this._search_timeout);
		this._search_timeout = setTimeout(this.searching.bind(this), 2000);
	}

	/** Performs a search and emits the search event. */
	search() {
		clearTimeout(this._search_timeout);
		setTimeout(() => {
			if (!this.config.globalSearch) {
				this.filter_filter = this.searching_text;
			}

			this.refresh();
		}, 100);
		this.onSearch.emit(this.searching_text);
	}

	/** Whether the page size dropdown is open. */
	select_page_size = false;

	/** Handles the next page action. */
	next(): void {
		if (
			typeof this.config.paginate === 'function' ||
			this.config.page * this.config.perPage < this.rows.length
		) {
			this.config.page += 1;
		}

		if (typeof this.config.paginate === 'function') {
			this.config.paginate(this.config.page);
		}

		this.refresh();
	}

	/** Handles the previous page action. */
	previous(): void {
		if (this.config.page > 1) {
			this.config.page -= 1;

			if (typeof this.config.paginate === 'function') {
				this.config.paginate(this.config.page);
			}

			this.refresh();
		}
	}

	/** Changes the number of items per page. */
	changePerPage(row: any): void {
		this.config.perPage = row;

		if (typeof this.config.setPerPage === 'function') {
			this.config.setPerPage(this.config.perPage);
		}

		this.config.page = 1;

		if (typeof this.config.paginate === 'function') {
			this.config.paginate(this.config.page);
		}

		this._store.set(this.tableId + 'perPage', row.toString());

		if ((this.config.page - 1) * this.config.perPage > this.rows.length) {
			this.lastPage();
		}

		this.select_page_size = false;

		this.refresh();
	}

	/** Goes to the last page of the table. */
	lastPage(): void {
		this.config.page = Math.ceil(this.rows.length / this.config.perPage);
	}

	/** Checks if the current page is the last page. */
	isLast(): boolean {
		return (
			this.rows &&
			this.config.page ==
				Math.ceil(this.rows.length / this.config.perPage)
		);
	}

	/** Sorts the table by the specified column. */
	sort(column: any): void {
		if (this.sort_type.title != column.title) {
			this.sort_type = {};
		}

		if (this.sortable[column.field]) {
			this.sort_type = {
				title: column.field,
				direction:
					(typeof this.sort_type.direction != 'string' && 'asc') ||
					(this.sort_type.direction == 'asc' && 'desc') ||
					undefined
			};
		}
	}
}
