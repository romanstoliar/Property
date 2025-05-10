import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyrecordFormComponents } from 'src/app/modules/propertyrecord/formcomponents/propertyrecord.formcomponents';
import { Propertyrecord } from 'src/app/modules/propertyrecord/interfaces/propertyrecord.interface';
import { PropertyrecordService } from 'src/app/modules/propertyrecord/services/propertyrecord.service';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';

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

	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	constructor(
		private _propertyrecordService: PropertyrecordService,
		private _propertyworkerService: PropertyworkerService,
		private _route: ActivatedRoute,
		private _form: FormService
	) {
		this._route.paramMap.subscribe((params) => {
			this.property_id = params.get('property_id') || '';
			this.load();
		});
	}

	create(): void {
		this._propertyworkerService.get().subscribe((workers) => {
			const formWithWorkers = {
				...this.form,
				components: [
					...this.form.components,
					{
						name: 'Select',
						key: 'worker_id',
						fields: [
							{ name: 'Label', value: 'Worker' },
							{
								name: 'Items',
								value: workers.map((w) => ({
									label: `${w.name} (${w.position})`,
									value: w._id
								}))
							}
						]
					}
				]
			};

			this._form.modal<Propertyrecord>(formWithWorkers, {
				label: 'Create',
				click: async (created, close) => {
					close();
					this._preCreate(created as Propertyrecord);
					this._propertyrecordService
						.create(created as Propertyrecord)
						.subscribe(() => {
							this.load();
						});
				}
			});
		});
	}

	update(record: Propertyrecord): void {
		this._form.modal<Propertyrecord>(
			this.form,
			{
				label: 'Update',
				click: async (updated, close) => {
					close();
					Object.assign(record, updated);
					this._propertyrecordService.update(record).subscribe(() => {
						this.load();
					});
				}
			},
			record
		);
	}

	delete(record: Propertyrecord): void {
		this._propertyrecordService.delete(record).subscribe(() => this.load());
	}

	load(): void {
		const query = this._buildQuery();
		this._propertyrecordService
			.get({ page: 1, query })
			.subscribe((records) => {
				this.propertyRecords = records;
			});
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

			const dateCreated = (r as any)['__created']
				? new Date((r as any)['__created'])
				: null;
			const dateMatch =
				(!start || (dateCreated && dateCreated >= start)) &&
				(!end || (dateCreated && dateCreated <= end));

			return nameMatch && typeMatch && dateMatch;
		});

		if (this.sort === 'asc') {
			filtered = filtered.sort(
				(a, b) =>
					new Date((a as any)['__created']).getTime() -
					new Date((b as any)['__created']).getTime()
			);
		} else if (this.sort === 'desc') {
			filtered = filtered.sort(
				(a, b) =>
					new Date((b as any)['__created']).getTime() -
					new Date((a as any)['__created']).getTime()
			);
		}

		return filtered;
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

	private _preCreate(record: Propertyrecord): void {
		if (this.property_id) {
			record.property_id = this.property_id;
		}
		if (this.type) {
			record.type = this.type as Propertyrecord['type'];
		}
	}
}
