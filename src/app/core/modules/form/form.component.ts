import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
import { FormComponentInterface } from './interfaces/component.interface';
import { FormInterface } from './interfaces/form.interface';
import { CoreService } from 'wacom';

@Component({
    selector: 'wform',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    standalone: false
})
export class FormComponent implements AfterViewInit {
	@Input() config: FormInterface;

	@Input() submition: Record<string, unknown> = {};

	@Output() wChange = new EventEmitter();

	@Output() wSubmit = new EventEmitter();

	constructor(private _core: CoreService) {}

	ngAfterViewInit(): void {
		this.submition['data'] = this.submition['data'] || {};
	}

	component(
		key: string,
		components = this.config.components
	): FormComponentInterface | false {
		for (const component of components) {
			if (component.key === key) {
				return component;
			}

			if (component.components?.length) {
				const deepComponent = this.component(key, component.components);

				if (deepComponent) {
					return deepComponent;
				}
			}
		}

		return false;
	}

	onSubmit(): void {
		this._core.afterWhile(this, () => {
			for (const component of this.config.components) {
				if (
					component.key &&
					component.required &&
					((component.valid && !component.valid()) ||
						(!component.valid && !this.submition[component.key]))
				) {
					if (typeof component.focus === 'function') {
						component.focus();
					}

					return;
				}
			}

			this.wSubmit.emit(this.submition);
		});
	}

	onChange(): void {
		this._core.afterWhile(this, () => {
			this.wChange.emit(this.submition);
		});
	}

	onClick(/* component: FormComponentInterface */): void {
		// if (typeof component.click === 'function') {
		// 	component.click(this.submition);
		// }
	}
}
