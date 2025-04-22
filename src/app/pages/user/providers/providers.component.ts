import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyproviderFormComponents } from 'src/app/modules/propertyprovider/formcomponents/propertyprovider.formcomponents';
import { Propertyprovider } from 'src/app/modules/propertyprovider/interfaces/propertyprovider.interface';
import { PropertyproviderService } from 'src/app/modules/propertyprovider/services/propertyprovider.service';

@Component({
	templateUrl: './providers.component.html',
	styleUrls: ['./providers.component.scss'],
	standalone: false
})
export class ProvidersComponent {
	isMenuOpen = false;
	providers: Propertyprovider[] = [];

	constructor(
		private _providerService: PropertyproviderService,
		private _form: FormService
	) {}

	ngOnInit(): void {
		this.loadProviders();
	}

	/** Метод завантаження списку постачальників */
	private loadProviders(): void {
		this._providerService.get().subscribe((data: Propertyprovider[]) => {
			this.providers = data;
		});
	}

	/** Форма для створення нового постачальника */
	form: FormInterface = this._form.getForm(
		'business',
		propertyproviderFormComponents
	);

	/** Метод створення нового постачальника */
	create(): void {
		this._form.modal<Propertyprovider>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Propertyprovider);

				this._providerService
					.create(created as Propertyprovider)
					.subscribe(() => {
						this.loadProviders();
					});
			}
		});
	}

	/** Попередня обробка перед створенням */
	private _preCreate(provider: Propertyprovider): void {
		delete provider.__created; // Видаляємо системне поле, якщо воно є
	}
}
