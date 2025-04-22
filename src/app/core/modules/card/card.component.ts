import { Component, Input, AfterContentInit, ContentChild, ElementRef } from '@angular/core';

/**
 * CardComponent is a flexible container that can be used to display various types
 * of content, including user profiles, product rows, or any custom content.
 * It supports a flexible layout with optional header and footer sections.
 */
@Component({
    selector: 'wcard',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: false
})
export class CardComponent implements AfterContentInit {
	/**
	 * Custom CSS classes to apply to the card.
	 */
	@Input() cardClass = '';

	/**
	 * Array of strings representing multiple content sections in the body.
	 * If provided, these sections will be rendered within the body of the card.
	 */
	@Input() sections: string[] | null = null;

	/**
	 * Indicates if header content is present.
	 */
	hasHeader = false;

	/**
	 * Indicates if footer content is present.
	 */
	hasFooter = false;

	@ContentChild('header', { static: false }) headerContent: ElementRef | undefined;
	@ContentChild('footer', { static: false }) footerContent: ElementRef | undefined;

	ngAfterContentInit(): void {
		this.hasHeader = !!this.headerContent;
		this.hasFooter = !!this.footerContent;
	}
}
