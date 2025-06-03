import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyworkerFormComponents } from 'src/app/modules/propertyworker/formcomponents/propertyworker.formcomponents';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';
import { CoreService, AlertService } from 'wacom';
import { environment } from 'src/environments/environment.prod';

@Component({
	templateUrl: './workerprofile.component.html',
	styleUrls: ['./workerprofile.component.scss'],
	standalone: false
})
export class WorkerprofileComponent {
	worker = this._propertyworkerService.doc(
		this._router.url.replace('/workerprofile/', '')
	);
	apiUrl = environment.url;

	constructor(
		private _propertyworkerService: PropertyworkerService,
		private _router: Router,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	isMenuOpen = false;

	form: FormInterface = this._form.getForm(
		'propertyworker',
		propertyworkerFormComponents
	);

	savePhotos(): void {
		this._propertyworkerService.update(this.worker).subscribe();
	}

	update(worker: Propertyworker): void {
		this._form.modal<Propertyworker>(
			this.form,
			{
				label: 'Update',
				click: async (updated: unknown, close: () => void) => {
					close();

					this._core.copy(updated as Propertyworker, worker);

					this._propertyworkerService.update(worker).subscribe({
						next: (res: Propertyworker) => {
							this.worker = { ...res }; // 🔁 force update
							this._alert.success({
								text: 'Worker updated successfully'
							});
						},
						error: (err) => {
							console.error('❌ Update failed:', err);
							this._alert.error({ text: 'Update failed' });
						}
					});
				}
			},
			worker
		);
	}

	delete(worker: Propertyworker): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this worker?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: (): void => {
						this._propertyworkerService.delete(worker);
						this._router.navigateByUrl('/workers');
					}
				}
			]
		});
	}
	onImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.src = 'assets/default.png';
	}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
