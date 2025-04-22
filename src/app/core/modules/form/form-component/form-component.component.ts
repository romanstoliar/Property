import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef
} from '@angular/core';
import { FormComponentInterface } from '../interfaces/component.interface';
import { FormInterface } from '../interfaces/form.interface';
import { FormService } from '../form.service';

@Component({
	selector: 'form-component',
	templateUrl: './form-component.component.html',
	styleUrls: ['./form-component.component.scss'],
	standalone: false
})
export class FormComponentComponent implements OnInit {
	@Input() index: string;

	@Input() config: FormInterface;

	@Input() component: FormComponentInterface;

	@Input() submition: Record<string, unknown> = {};

	@Output() wSubmit = new EventEmitter();

	@Output() wChange = new EventEmitter();

	@Output() wClick = new EventEmitter();

	submit(): void {
		this.wSubmit.emit(this.submition);
	}

	change(): void {
		this.wChange.emit(this.submition);
	}

	click(): void {
		this.wClick.emit(this.submition);
	}

	get hasComponents(): boolean {
		return Array.isArray(this.component.components);
	}

	get template(): TemplateRef<unknown> {
		return this._form.getTemplateComponent(
			this.component.name as string
		) as TemplateRef<unknown>;
	}

	field: Record<string, unknown> = {};

	localKey: string;

	localSubmition: Record<string, unknown>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		if (Array.isArray(this.component.fields)) {
			for (const field of this.component.fields) {
				this.field[field.name] = field.value;
			}
		}

		this.localSubmition = this.submition;

		const keys = (this.component.key || '')?.split('.');

		while (keys.length > 1) {
			let key = keys.shift() as string;

			if (key.endsWith('[]')) {
				key = key.replace('[]', '');

				const index = this._getIndex();

				this.localSubmition[key] = (this.localSubmition[key] ||
					[]) as Record<string, unknown>[];

				while (
					index + 1 >
					(this.localSubmition[key] as Record<string, unknown>[])
						.length
				) {
					(
						this.localSubmition[key] as Record<string, unknown>[]
					).push({});
				}

				this.localSubmition = (
					this.localSubmition[key] as Record<string, unknown>[]
				)[index];
			} else {
				this.localSubmition = this.localSubmition[
					this.localKey
				] as Record<string, unknown>;
			}
		}

		this.localKey = keys[0];
	}

	private _getIndex(components = this.config.components): number {
		for (const component of components) {
			if (component.components) {
				const localIndex = this._getIndex(component.components);

				if (localIndex >= 0) {
					for (let i = 0; i < component.components.length; i++) {
						for (const comp of component.components[i]
							.components as Record<string, unknown>[]) {
							if (comp === this.component) {
								return i;
							}
						}
					}
				}

				if (
					component?.components?.indexOf(
						this.component as unknown as any
					) >= 0
				) {
					return component.components.indexOf(
						this.component as unknown as any
					);
				}
			}
		}

		return -1;
	}
}
