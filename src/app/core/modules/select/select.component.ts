import {
	Component,
	ElementRef,
	Input,
	TemplateRef,
	ViewChild,
	Output,
	EventEmitter,
	OnInit,
	OnChanges,
	SimpleChanges
} from '@angular/core';

/**
 * The SelectComponent is a customizable select dropdown component that supports
 * single or multiple selections, search, and custom templates for both the view
 * and items.
 */
@Component({
    selector: 'wselect',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    standalone: false
})
export class SelectComponent implements OnInit, OnChanges {
	/** Placeholder text for the select input. */
	@Input() placeholder = '';

	/** List of items to display in the dropdown. */
	@Input() items: any = [];

	_items: any = {};

	/** Whether the select input is disabled. */
	@Input() disabled = false;

	/** Whether the select input is clearable. */
	@Input() clearable = false;

	/** Clears the selected values. */
	clear(): void {
		if (this.multiple) {
			this._values = [];

			this.modelChange.emit(this._values);
		} else {
			this._selected = '';

			this.modelChange.emit('');
		}
	}

	/** The name of the property to display in the dropdown items. */
	@Input() name = 'name';

	/** The property used as the value for each item. */
	@Input() value = '_id';

	/** Whether multiple items can be selected. */
	@Input() multiple = false;

	/** The label for the select input. */
	@Input() label = '';

	/** Whether the dropdown is searchable. */
	@Input() searchable = false;

	/** The property by which to search items. */
	@Input() searchableBy = 'name';

	/** Event emitted when the selected values change. */
	@Output() modelChange = new EventEmitter();

	_values: any = [];

	_names: any = [];

	_selected: string;

	selectShow: any;

	/** The selected value(s). */
	@Input() select: any;

	/** Custom template for the view (header) of the select input. */
	@Input('view') t_view: TemplateRef<any>;

	/** Custom template for each item in the dropdown. */
	@Input('item') t_item: TemplateRef<any>;

	/** Custom template for the search input. */
	@Input('search') t_search: TemplateRef<any>;

	search = '';

	@ViewChild('e_search', { static: false }) e_search: ElementRef;

	ngOnInit(): void {
		for (let i = 0; i < this.items.length; i++) {
			if (typeof this.items[i] === 'string') {
				this.items[i] = {
					name: this.items[i]
				};
				this.items[i][this.value] = this.items[i].name;
			}
			this._items[this.items[i][this.value]] = this.items[i];
		}

		if (this.multiple) {
			this._values = this.select || [];
		} else {
			this._selected = this._items[this.select]
				? this._items[this.select][this.name]
				: this.select;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['select'] && !changes['select'].firstChange) {
			this.ngOnInit();
		}
	}

	/** Handles click events on items. */
	item_onclick(item: any): void {
		if (this.multiple) {
			if (this._values.indexOf(item[this.value]) !== -1) {
				this._values.splice(this._values.indexOf(item[this.value]), 1);
			} else {
				this._values.push(item[this.value]);
			}

			if (this._names.indexOf(item[this.name]) !== -1) {
				this._names.splice(this._names.indexOf(item[this.name]), 1);
			} else {
				this._names.push(item[this.name]);
			}

			this._selected =
				this._names.length == 0
					? this.placeholder
					: this._names.join(', ');

			this.modelChange.emit(this._values);
		} else {
			this._selected = item[this.name];

			this.selectShow = false;

			this.modelChange.emit(item[this.value]);
		}
	}

	/** Focuses the search input when the dropdown is opened. */
	focus_search(): void {
		this.search = '';

		if (!this.searchable || this.t_search) return;

		if (this.e_search) {
			this.e_search.nativeElement.focus();
		} else {
			setTimeout(this.focus_search.bind(this), 100);
		}
	}
}
