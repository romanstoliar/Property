import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ButtonComponent is a reusable button component that supports various styles
 * and types, such as primary, secondary, success, danger, and more. It also supports
 * disabled states and custom click events.
 */
@Component({
    selector: 'wbutton',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: false
})
export class ButtonComponent {
	/**
	 * The type of button.
	 * Options include: primary, secondary, success, danger, warning, info, light, dark, link.
	 * Default is 'primary'.
	 */
	@Input() type:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark'
		| 'link' = 'primary';

	/**
	 * Custom CSS classes to add to the button.
	 * Default is an empty string.
	 */
	@Input() class = '';

	/**
	 * Whether the button is disabled.
	 * Default is false.
	 */
	@Input() disabled = false;

	/**
	 * When true, the button will not submit the form even if placed inside a form.
	 * Default is false.
	 */
	@Input() disableSubmit = false;

	/**
	 * Custom function to handle click events.
	 * If not provided, the button acts as a normal button.
	 */
	@Input() click: (() => void) | undefined;

	/**
	 * Event emitted when the button is clicked.
	 */
	@Output() wClick = new EventEmitter<void>();

	/**
	 * Method called when the button is clicked.
	 * Emits the wClick event and calls the custom click function if provided.
	 */
	clicked(): void {
		if (this.disabled) {
			return;
		}

		if (typeof this.click === 'function') {
			this.click();
		}

		this.wClick.emit();
	}

	/**
	 * Sets the disabled state of the button.
	 * @param disabled - Whether the button should be disabled.
	 */
	setDisabled(disabled: boolean): void {
		this.disabled = disabled;
	}
}
