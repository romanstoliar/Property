import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { propertyworkerFormComponents } from 'src/app/modules/propertyworker/formcomponents/propertyworker.formcomponents';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';
import { environment } from 'src/environments/environment.prod';
import { REGIONS_AND_CITIES } from 'src/app/shared/data/regions-and-cities';

@Component({
	templateUrl: './workers.component.html',
	styleUrls: ['./workers.component.scss'],
	standalone: false
})
export class WorkersComponent {
	isMenuOpen = false;
	workers: Propertyworker[] = [];

	searchTerm = '';
	filterStatus = '';
	apiUrl = environment.url;

	regions = Object.keys(REGIONS_AND_CITIES);
	cities: string[] = [];
	selectedRegion: string = '';
	selectedCity: string = '';

	constructor(
		private _propertyworkerService: PropertyworkerService,
		private _form: FormService,
		private _translate: TranslateService
	) {}

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this._propertyworkerService
			.get()
			.subscribe((data: Propertyworker[]) => {
				this.workers = data;
			});
	}

	form: FormInterface = this._form.getForm(
		'propertyworker',
		propertyworkerFormComponents
	);

	create(): void {
		this._form.modal<Propertyworker>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Propertyworker);

				this._propertyworkerService
					.create(created as Propertyworker)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	private _preCreate(worker: Propertyworker): void {
		delete worker.__created;
	}

	onRegionChange(region: string): void {
		this.selectedRegion = region;
		this.cities = REGIONS_AND_CITIES[region] || [];
		this.selectedCity = '';
	}

	filteredWorkers(): Propertyworker[] {
		const search = this.searchTerm?.toLowerCase().trim() || '';
		const region = this.selectedRegion?.toLowerCase().trim() || '';
		const city = this.selectedCity?.toLowerCase().trim() || '';
		const status = this.filterStatus?.toLowerCase().trim() || '';

		return this.workers.filter((w) => {
			const matchSearch =
				!search ||
				(w.name && w.name.toLowerCase().includes(search)) ||
				(w.position && w.position.toLowerCase().includes(search));

			const matchRegion =
				!region ||
				(w.region && w.region.toLowerCase().includes(region));

			const matchCity =
				!city || (w.city && w.city.toLowerCase().includes(city));

			const matchStatus =
				!status || (w.status && w.status.toLowerCase() === status);

			return matchSearch && matchRegion && matchCity && matchStatus;
		});
	}
	onImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.src = 'assets/user.png';
	}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
}
