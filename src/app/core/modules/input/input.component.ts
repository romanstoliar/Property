import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	ElementRef,
	ViewChild,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { CoreService } from 'wacom';

/**
 * InputComponent is a customizable input component that supports various types of inputs,
 * including text, radio buttons, checkboxes, and textareas. It also provides validation,
 * custom value replacement, and event handling for changes, submissions, and blur events.
 */
@Component({
    selector: 'winput',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: false
})
export class InputComponent implements OnInit, OnChanges {
	/**
	 * The value of the input field.
	 */
	@Input() value: string | number | boolean = '';

	/**
	 * A function to replace the input value before emitting changes.
	 * This allows custom transformations of the input value.
	 */
	@Input() replace: (
		value: string | number | boolean
	) => string | number | boolean;

	/**
	 * A function to validate the input value. The default implementation checks for a truthy value.
	 */
	@Input() valid: (value: string | number | boolean) => boolean = (
		value: string | number | boolean
	) => !!value;

	/**
	 * A list of items used for radio buttons or other list-based inputs.
	 */
	@Input() items: string[] = [];

	/**
	 * The placeholder text for the input field.
	 */
	@Input() placeholder = '';

	/**
	 * Whether the input field is disabled.
	 */
	@Input() disabled = false;

	/**
	 * Whether the input field should be focused when the component initializes.
	 */
	@Input() focused = false;

	/**
	 * Custom CSS classes for styling the input field.
	 */
	@Input() wClass: string;

	/**
	 * The name attribute of the input field.
	 */
	@Input() name = 'name';

	/**
	 * The type of input.
	 */
	@Input() type:
		| 'text'
		| 'password'
		| 'email'
		| 'radio'
		| 'checkbox'
		| 'textarea'
		| 'search'
		| 'tel'
		| 'url'
		| 'number'
		| 'range'
		| 'color'
		| 'date'
		| 'month'
		| 'week'
		| 'time'
		| 'datetime'
		| 'datetime-local' = 'text';

	/**
	 * The label for the input field.
	 */
	@Input() label = '';

	/**
	 * The label for the input field.
	 */
	@Input() setFocus: {
		focus: () => void;
	};

	/**
	 * Event emitted when the input value changes.
	 */
	@Output() wChange = new EventEmitter<string | number | boolean>();

	/**
	 * Event emitted when the form is submitted.
	 */
	@Output() wSubmit = new EventEmitter<string | number | boolean>();

	/**
	 * Event emitted when the input field loses focus.
	 */
	@Output() wBlur = new EventEmitter<void>();

	/**
	 * Reference to the input element in the template.
	 */
	@ViewChild('inputEl') inputEl: ElementRef;

	/**
	 * Error state of the input field, set to true if validation fails.
	 */
	error = false;

	constructor(private _core: CoreService) {}

	/**
	 * Initializes the component. Focuses the input field if the focused input is true.
	 */
	ngOnInit(): void {
		if (this.focused) {
			this.focus();
		}

		if (this.setFocus) {
			this.setFocus.focus = this.focus.bind(this);
		}
	}

	/**
	 * Detect changes.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['disabled']) {
			this.disabled = changes['disabled'].currentValue;
		}
	}

	/**
	 * Focuses the input field.
	 */
	focus(): void {
		setTimeout(() => {
			this.inputEl.nativeElement.focus();
		}, 100);
	}

	/**
	 * Handles the change event for the input field.
	 * Applies the replace function if provided, and emits the new value.
	 */
	onChange(): void {
		this._core.afterWhile(
			'winput',
			(): void => {
				this.value =
					typeof this.replace === 'function'
						? this.replace(this.value)
						: this.value;

				this.wChange.emit(this.value);
			},
			100
		);
	}

	/**
	 * Handles the submit event for the input field.
	 * Validates the input value before emitting the submit event.
	 */
	onSubmit(): void {
		if (this.valid(this.value)) {
			this.wSubmit.emit(this.value);
		} else {
			this.error = true;
		}
	}

	/**
	 * Sets the disabled state of the input field.
	 */
	setDisabled(disabled: boolean): void {
		this.disabled = disabled;
	}
}
