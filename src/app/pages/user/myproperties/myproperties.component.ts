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

	searchTerm = '';
	filterStatus = '';

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

	form: FormInterface = this._form.getForm(
		'myproperty',
		propertyFormComponents
	);

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

	private _preCreate(property: Property): void {
		delete property.__created;
	}

	filteredProperties(): Property[] {
		const search = this.searchTerm?.toLowerCase().trim() || '';

		return this.properties.filter((p) => {
			const matchSearch =
				p.name?.toLowerCase().includes(search) ||
				p.address?.toLowerCase().includes(search);

			const matchStatus =
				!this.filterStatus || p.status === this.filterStatus;

			return matchSearch && matchStatus;
		});
	}
}
