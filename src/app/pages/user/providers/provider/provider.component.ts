import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyproviderFormComponents } from 'src/app/modules/propertyprovider/formcomponents/propertyprovider.formcomponents';
import { Propertyprovider } from 'src/app/modules/propertyprovider/interfaces/propertyprovider.interface';
import { PropertyproviderService } from 'src/app/modules/propertyprovider/services/propertyprovider.service';
import { AlertService, CoreService } from 'wacom';

@Component({
	selector: 'app-provider',
	standalone: false,
	templateUrl: './provider.component.html',
	styleUrl: './provider.component.scss'
})
export class ProviderComponent {
	@Input() provider: Propertyprovider;
	@Output() load = new EventEmitter();

	form: FormInterface = this._form.getForm(
		'provider',
		propertyproviderFormComponents
	);

	constructor(
		private _form: FormService,
		private _providerService: PropertyproviderService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	update(): void {
		this._form
			.modal<Propertyprovider>(this.form, [], this.provider)
			.then((updated: Propertyprovider) => {
				this._core.copy(updated, this.provider);
				this._providerService.update(this.provider);
			});
	}

	delete(): void {
		this._alert.question({
			text: this._translate.translate(
				'Common.Are you sure you want to delete this provider?'
			),
			buttons: [
				{
					text: this._translate.translate('Common.No')
				},
				{
					text: this._translate.translate('Common.Yes'),
					callback: async (): Promise<void> => {
						this._providerService
							.delete(this.provider)
							.subscribe(() => {
								this.load.emit();
							});
					}
				}
			]
		});
	}
}
