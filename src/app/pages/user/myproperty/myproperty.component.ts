import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyFormComponents } from 'src/app/modules/property/formcomponents/property.formcomponents';
import { Property } from 'src/app/modules/property/interfaces/property.interface';
import { PropertyService } from 'src/app/modules/property/services/property.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './myproperty.component.html',
	styleUrls: ['./myproperty.component.scss'],
	standalone: false
})
export class MypropertyComponent {
	property = this._propertyService.doc(
		this._router.url.replace('/myproperty/', '')
	);

	constructor(
		private _propertyService: PropertyService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'property',
		propertyFormComponents
	);
	savePhotos(): void {
		this._propertyService.update(this.property).subscribe();
	}

	update(prop: Property): void {
		this._form.modal<Property>(
			this.form,
			{
				label: 'Update',
				click: async (updated: unknown, close: () => void) => {
					close();

					this._core.copy(updated as Property, prop);

					this._propertyService.update(prop).subscribe({
						next: (res: Property) => {
							this.property = { ...res }; // 🔁 замінюємо об'єкт, щоб Angular помітив зміни
							this._alert.success({
								text: 'Property updated successfully'
							});
						},
						error: (err) => {
							console.error('❌ Update failed:', err);
							this._alert.error({ text: 'Update failed' });
						}
					});
				}
			},
			prop
		);
	}

	delete(prop: Property): void {
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
					callback: (): void => {
						this._propertyService.delete(prop);
						this._router.navigateByUrl('/myproperties');
					}
				}
			]
		});
	}
}
