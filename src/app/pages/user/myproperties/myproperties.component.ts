import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyFormComponents } from 'src/app/modules/property/formcomponents/property.formcomponents';
import { Property } from 'src/app/modules/property/interfaces/property.interface';
import { PropertyService } from 'src/app/modules/property/services/property.service';

@Component({
	templateUrl: './myproperties.component.html',
	styleUrls: ['./myproperties.component.scss'],
	standalone: false
})
export class MypropertiesComponent {
	isMenuOpen = false;
	properties: Property[] = [];

	constructor(
		private _propertyService: PropertyService,
		private _form: FormService
	) {}

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this._propertyService.get().subscribe((data: Property[]) => {
			this.properties = data;
		});
	}

	/** Форма для створення нової властивості */
	form: FormInterface = this._form.getForm(
		'myproperty',
		propertyFormComponents
	);

	/** Метод створення нової властивості */
	create(): void {
		this._form.modal<Property>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Property);

				this._propertyService
					.create(created as Property)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	/** Попередня обробка перед створенням */
	private _preCreate(property: Property): void {
		delete property.__created; // Видаляємо системне поле, якщо воно є
	}
}
