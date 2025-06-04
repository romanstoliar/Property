import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyFormComponents } from 'src/app/modules/property/formcomponents/property.formcomponents';
import { Property } from 'src/app/modules/property/interfaces/property.interface';
import { PropertyService } from 'src/app/modules/property/services/property.service';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
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
	selectedRegion: '';
	selectedCity: '';
	apiUrl = environment.url;

	constructor(
		private _propertyService: PropertyService,
		private _form: FormService,
		private location: Location,
		private _translate: TranslateService
	) {}

	goBack() {
		this.location.back();
	}

	statusOptions = ['active', 'rent', 'sale', 'archived'];

	ngOnInit(): void {
		this.load();

		const statusKeys = [
			'Common.All',
			'Common.active',
			'Common.rent',
			'Common.sale',
			'Common.archived',
			'Common.Region',
			'Common.City'
		];

		statusKeys.forEach((key) => this._translate.translate(key));
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
		const region = this.selectedRegion?.toLowerCase().trim() || '';
		const city = this.selectedCity?.toLowerCase().trim() || '';
		const status = this.filterStatus?.toLowerCase().trim() || '';

		return this.properties.filter((p) => {
			const matchSearch =
				!search ||
				(p.name && p.name.toLowerCase().includes(search)) ||
				(p.address && p.address.toLowerCase().includes(search));

			const matchRegion =
				!region ||
				(p.region && p.region.toLowerCase().includes(region));

			const matchCity =
				!city || (p.city && p.city.toLowerCase().includes(city));

			const matchStatus =
				!status || (p.status && p.status.toLowerCase() === status);

			return matchSearch && matchRegion && matchCity && matchStatus;
		});
	}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
	getTranslatedLabel(label: string): string {
		return this._translate.translate(`Common.${label}`);
	}
	getTranslated(text: string): string {
		return this._translate.translate('Common.' + text);
	}

	getTranslatedWithNamespace(key: string, ns: string = 'Common'): string {
		return this._translate.translate(`${ns}.${key}`);
	}
}
