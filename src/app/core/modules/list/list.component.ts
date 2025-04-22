import {
	Component,
	ContentChild,
	ElementRef,
	Input,
	ViewChild,
	HostListener,
	OnInit
} from '@angular/core';
import { ItemDirective } from './list.directive';

/**
 * The ListComponent is responsible for displaying a list of items with features
 * like infinite scroll, pull to refresh, and loading more items on button click.
 */
@Component({
	selector: 'wlist',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	@ContentChild(ItemDirective, { static: false }) action: any;

	@ViewChild('container') container: ElementRef;

	/**
	 * The array of items to be displayed in the list.
	 */
	@Input() items: any[] = [];

	/**
	 * The initial limit on the number of items to display.
	 */
	@Input() limit = 100;

	/**
	 * The number of items to load each time more items are requested.
	 */
	@Input() step = 100;

	/**
	 * Indicates whether the user is pulling to refresh.
	 */
	isPulling = false;

	/**
	 * Indicates whether more items can be loaded.
	 */
	get canLoadMore(): boolean {
		return this.limit < this.items.length;
	}

	private _itemHeight: number;
	private _devide = 0.5;

	ngOnInit(): void {
		// Initialize if needed
	}

	/**
	 * Handles the scroll event for infinite scrolling.
	 */
	onScroll($event: Event): void {
		if (!this.container) return;

		const ele = this.container.nativeElement;

		if (!this._itemHeight && ele.children.length) {
			this._itemHeight = ele.children[0].clientHeight;
		}

		if (!this._itemHeight) return;

		if (
			ele.scrollTop > this._itemHeight * this.limit * this._devide &&
			this.limit < this.items.length
		) {
			this.loadMore();

			if (this._devide < 0.8) {
				this._devide += 0.2;
			}
		}
	}

	/**
	 * Loads more items into the view.
	 */
	loadMore(): void {
		this.limit += this.step;
	}

	/**
	 * Handles the "pull to refresh" functionality.
	 */
	@HostListener('window:touchmove', ['$event'])
	onTouchMove($event: TouchEvent): void {
		const ele = this.container.nativeElement;

		if (ele.scrollTop === 0 && $event.touches[0].clientY > 50) {
			this.isPulling = true;
		} else {
			this.isPulling = false;
		}
	}

	@HostListener('window:touchend')
	onTouchEnd(): void {
		if (this.isPulling) {
			this.refresh();
			this.isPulling = false;
		}
	}

	/**
	 * Refreshes the list by reloading items.
	 */
	refresh(): void {
		this.limit = this.step;
		// Optionally, add logic to refresh the list from the backend
	}
}
