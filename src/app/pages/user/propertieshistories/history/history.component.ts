import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyrecordFormComponents } from 'src/app/modules/propertyrecord/formcomponents/propertyrecord.formcomponents';
import { Propertyrecord } from 'src/app/modules/propertyrecord/interfaces/propertyrecord.interface';
import { PropertyrecordService } from 'src/app/modules/propertyrecord/services/propertyrecord.service';
import { AlertService, CoreService } from 'wacom';
import { ChangeDetectorRef } from '@angular/core';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';

@Component({
	selector: 'app-history',
	standalone: false,
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
	@Input() record: Propertyrecord;
	@Output() load = new EventEmitter();

	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	workers: Propertyworker[] = [];

	constructor(
		private _form: FormService,
		private _propertyrecordService: PropertyrecordService,
		private _propertyworkerService: PropertyworkerService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService,
		private _cdr: ChangeDetectorRef
	) {
		// Завантаження працівників через .get()
		this._propertyworkerService
			.get({})
			.subscribe((list: Propertyworker[]) => {
				this.workers = list;
			});
	}

	update(record: Propertyrecord): void {
		this._form
			.modal<Propertyrecord>(this.form, [], record)
			.then((updated: Propertyrecord) => {
				if (!updated) return;

				this._core.copy(updated, record);
				this._propertyrecordService.update(record).subscribe();
			});
	}

	delete(): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this record?'
			),
			buttons: [
				{ text: this._translate.translate('Common.No') },
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

	getWorkerName(id: string): string {
		const worker = this.workers.find((w) => w._id === id);
		return worker?.name || '—';
	}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
