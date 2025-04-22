import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyFormComponents } from '../../formcomponents/property.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/router';

@Component({
	templateUrl: './properties.component.html',
	styleUrls: ['./properties.component.scss'],
	standalone: false
})
export class PropertiesComponent {
	columns = [
		'name',
		'description',
		'address',
		'type',
		'area',
		'price',
		'thumb'
	];

	form: FormInterface = this._form.getForm(
		'property',
		propertyFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertyService.setPerPage.bind(
			this._propertyService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Property>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Property);

					await firstValueFrom(
						this._propertyService.create(created as Property)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Property): void => {
			this._form.modal<Property>(this.form, {
				label: 'Update',
				click: async (updated: unknown, close: () => void) => {
					close();

					this._core.copy(updated as Property, doc);

					await firstValueFrom(this._propertyService.update(doc));
				}
			});
		},
		delete: (doc: Property): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this property?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._propertyService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'description',
				hrefFunc: (doc: Property): string => {
					return '/propertiesrecords/' + doc._id;
				}
			},
			{
				icon: 'swap_horiz',
				hrefFunc: (doc: Property): string => {
					return '/propertiestrades/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Property): void => {
					this._form.modalUnique<Property>('property', 'url', doc);
				}
			},
			{
				icon: 'assignment',
				hrefFunc: (doc: Property): string => {
					return '/propertiesservices/' + doc._id;
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Property[] = [];

	constructor(
		private _translate: TranslateService,
		private _propertyService: PropertyService, // Виправлено
		private _alert: AlertService,
		private _route: ActivatedRoute,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._propertyService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Property>(create ? [] : this.rows)
				.then(async (propertys: Property[]) => {
					if (create) {
						for (const property of propertys) {
							this._preCreate(property);

							await firstValueFrom(
								this._propertyService.create(property)
							);
						}
					} else {
						for (const property of this.rows) {
							if (
								!propertys.find(
									(localProperty) =>
										localProperty._id === property._id
								)
							) {
								await firstValueFrom(
									this._propertyService.delete(property)
								);
							}
						}

						for (const property of propertys) {
							const localProperty = this.rows.find(
								(localProperty) =>
									localProperty._id === property._id
							);

							if (localProperty) {
								this._core.copy(property, localProperty);

								await firstValueFrom(
									this._propertyService.update(localProperty)
								);
							} else {
								this._preCreate(property);

								await firstValueFrom(
									this._propertyService.create(property)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(property: Property): void {
		delete property.__created;
	}
	/*private _query(): string {
		let query = '';
		if (this.property_id) {
			query += (query ? '&' : '') + 'property=' + this.property_id;
		}
		return query;
	}*/
}
