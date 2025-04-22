import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyrecordFormComponents } from 'src/app/modules/propertyrecord/formcomponents/propertyrecord.formcomponents';
import { Propertyrecord } from 'src/app/modules/propertyrecord/interfaces/propertyrecord.interface';
import { PropertyrecordService } from 'src/app/modules/propertyrecord/services/propertyrecord.service';
import { CoreService, AlertService } from 'wacom';

@Component({
	templateUrl: './propertyhistory.component.html',
	styleUrls: ['./propertyhistory.component.scss'],
	standalone: false
})
export class PropertyhistoryComponent {
	record = this._propertyrecordService.doc(
		this._router.url.replace('/propertyhistory/', '')
	);
	constructor(
		private _propertyrecordService: PropertyrecordService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	update(record: Propertyrecord): void {
		this._form
			.modal<Propertyrecord>(this.form, [], record)
			.then((updated: Propertyrecord) => {
				this._core.copy(updated, record);
				this._propertyrecordService.update(record);
			});
	}

	delete(record: Propertyrecord): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this record?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: (): void => {
						this._propertyrecordService.delete(record);
						this._router.navigateByUrl(
							'/propertieshistories/' + record.property_id
						);
					}
				}
			]
		});
	}
}
