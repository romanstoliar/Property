import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyrecordFormComponents } from 'src/app/modules/propertyrecord/formcomponents/propertyrecord.formcomponents';
import { Propertyrecord } from 'src/app/modules/propertyrecord/interfaces/propertyrecord.interface';
import { PropertyrecordService } from 'src/app/modules/propertyrecord/services/propertyrecord.service';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';
import { ChangeDetectorRef } from '@angular/core';
import { CoreService } from 'wacom';
import { AlertService } from 'wacom';

@Component({
	templateUrl: './propertieshistories.component.html',
	styleUrls: ['./propertieshistories.component.scss'],
	standalone: false
})
export class PropertieshistoriesComponent {
	isMenuOpen = false;
	propertyRecords: Propertyrecord[] = [];
	property_id = '';

	searchTerm = '';
	type = '';
	dateStart = '';
	dateEnd = '';
	sort = '';

	// 🔽 аналітика
	totalCost = 0;
	costByType: { [key: string]: number } = {};

	constructor(
		private _propertyrecordService: PropertyrecordService,
		private _form: FormService,
		private _route: ActivatedRoute,
		private _core: CoreService,
		private _alert: AlertService
	) {
		this._route.paramMap.subscribe((params) => {
			this.property_id = params.get('property_id') || '';
			this.load();
		});
	}

	load(): void {
		const query = this._buildQuery();
		this._propertyrecordService
			.get({ page: 1, query })
			.subscribe((records) => {
				this.propertyRecords = records;
				this.calculateAnalytics(); // <== виклик після завантаження
			});
	}

	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	create(): void {
		this._form.modal<Propertyrecord>(this.form, {
			label: 'Create Record',
			click: async (created: unknown, close: () => void) => {
				close();
				this._preCreate(created as Propertyrecord);

				this._propertyrecordService
					.create(created as Propertyrecord)
					.subscribe(() => {
						this.load();
					});
			}
		});
	}

	private _preCreate(record: Propertyrecord): void {
		if (this.property_id) {
			record.property_id = this.property_id;
		}
	}

	delete(record: Propertyrecord): void {
		this._propertyrecordService.delete(record).subscribe(() => this.load());
	}

	private _buildQuery(): string {
		const params: string[] = [];
		if (this.property_id) params.push(`property_id=${this.property_id}`);
		if (this.type) params.push(`type=${this.type}`);
		if (this.dateStart) params.push(`dateStart=${this.dateStart}`);
		if (this.dateEnd) params.push(`dateEnd=${this.dateEnd}`);
		if (this.sort) params.push(`sort=${this.sort}`);
		return params.join('&');
	}

	filteredRecords(): Propertyrecord[] {
		const search = this.searchTerm.toLowerCase().trim();
		const type = this.type.toLowerCase().trim();
		const start = this.dateStart ? new Date(this.dateStart) : null;
		const end = this.dateEnd ? new Date(this.dateEnd) : null;

		let filtered = this.propertyRecords.filter((r) => {
			const nameMatch =
				!search ||
				(r.name && r.name.toLowerCase().includes(search)) ||
				(r.description && r.description.toLowerCase().includes(search));

			const typeMatch =
				!type || (r.type && r.type.toLowerCase() === type);

			const createdAt = r['createdAt'] ? new Date(r['createdAt']) : null;
			const dateMatch =
				(!start || (createdAt && createdAt >= start)) &&
				(!end || (createdAt && createdAt <= end));

			return nameMatch && typeMatch && dateMatch;
		});

		if (this.sort === 'asc') {
			filtered = filtered.sort(
				(a, b) =>
					new Date(a['createdAt']).getTime() -
					new Date(b['createdAt']).getTime()
			);
		} else {
			filtered = filtered.sort(
				(a, b) =>
					new Date(b['createdAt']).getTime() -
					new Date(a['createdAt']).getTime()
			);
		}

		return filtered;
	}

	// ✅ АНАЛІТИКА
	private calculateAnalytics(): void {
		this.totalCost = this.propertyRecords.reduce(
			(sum, r) => sum + (r.cost || 0),
			0
		);

		this.costByType = this.propertyRecords.reduce((acc, r) => {
			acc[r.type] = (acc[r.type] || 0) + (r.cost || 0);
			return acc;
		}, {} as { [key: string]: number });
	}
}
