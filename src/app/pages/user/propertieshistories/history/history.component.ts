import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyrecordFormComponents } from 'src/app/modules/propertyrecord/formcomponents/propertyrecord.formcomponents';
import { Propertyrecord } from 'src/app/modules/propertyrecord/interfaces/propertyrecord.interface';
import { PropertyrecordService } from 'src/app/modules/propertyrecord/services/propertyrecord.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-history',
	standalone: false,
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
	@Input() record: Propertyrecord;
	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	@Output() load = new EventEmitter();
	constructor(
		private _form: FormService,
		private _propertyrecordService: PropertyrecordService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	update(): void {
		this._form
			.modal<Propertyrecord>(this.form, [], this.record)
			.then((updated: Propertyrecord) => {
				this._core.copy(updated, this.record);
				this._propertyrecordService.update(this.record);
			});
	}

	delete(): void {
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
					callback: async (): Promise<void> => {
						this._propertyrecordService
							.delete(this.record)
							.subscribe(() => {
								this.load.emit();
							});
					}
				}
			]
		});
	}
}
