import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyFormComponents } from 'src/app/modules/property/formcomponents/property.formcomponents';
import { Property } from 'src/app/modules/property/interfaces/property.interface';
import { PropertyService } from 'src/app/modules/property/services/property.service';
import { AlertService, CoreService } from 'wacom';
import { environment } from 'src/environments/environment.prod';
@Component({
	selector: 'app-myproperty',
	standalone: false,

	templateUrl: './myproperty.component.html',
	styleUrl: './myproperty.component.scss'
})
export class MypropertyComponent {
	@Input() property: Property;

	apiUrl = environment.url;

	form: FormInterface = this._form.getForm(
		'property',
		propertyFormComponents
	);

	@Output() load = new EventEmitter();

	constructor(
		private _form: FormService,
		private _propertyService: PropertyService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}
	update(prop: Property): void {
		this._form
			.modal<Property>(this.form, [], prop)
			.then((updated: Property) => {
				this._core.copy(updated, prop);
				this._propertyService.update(prop).subscribe();
			});
	}

	delete(): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this property?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: async (): Promise<void> => {
						this._propertyService
							.delete(this.property)
							.subscribe(() => {
								this.load.emit();
							});
					}
				}
			]
		});
	}
	onImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.src = 'assets/default.png';
	}
}
