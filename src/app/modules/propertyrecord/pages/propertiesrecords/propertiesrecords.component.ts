import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertyrecordService } from '../../services/propertyrecord.service';
import { Propertyrecord } from '../../interfaces/propertyrecord.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyrecordFormComponents } from '../../formcomponents/propertyrecord.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
	templateUrl: './propertiesrecords.component.html',
	styleUrls: ['./propertiesrecords.component.scss'],
	standalone: false
})
export class PropertiesrecordsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'propertyrecord',
		propertyrecordFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertyrecordService.setPerPage.bind(
			this._propertyrecordService
		),
		allDocs: false,
		create: this._router.url.includes('propertiesrecords/')
			? (): void => {
					this._form.modal<Propertyrecord>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Propertyrecord);

							await firstValueFrom(
								this._propertyrecordService.create(
									created as Propertyrecord
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Propertyrecord): void => {
			this._form
				.modal<Propertyrecord>(this.form, [], doc)
				.then((updated: Propertyrecord) => {
					this._core.copy(updated, doc);

					this._propertyrecordService.update(doc);
				});
		},
		delete: (doc: Propertyrecord): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this propertyrecord?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._propertyrecordService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Propertyrecord): void => {
					this._form.modalUnique<Propertyrecord>(
						'propertyrecord',
						'url',
						doc
					);
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

	rows: Propertyrecord[] = [];

	property_id = '';

	constructor(
		private _translate: TranslateService,
		private _propertyrecordService: PropertyrecordService,
		private _alert: AlertService,
		private _route: ActivatedRoute,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.property_id = params.get('property_id') || '';
			console.log(this.property_id);
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._propertyrecordService
					.get({ page, query: this._query() })
					.subscribe((rows) => {
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
				.modalDocs<Propertyrecord>(create ? [] : this.rows)
				.then(async (propertyrecords: Propertyrecord[]) => {
					if (create) {
						for (const propertyrecord of propertyrecords) {
							this._preCreate(propertyrecord);

							await firstValueFrom(
								this._propertyrecordService.create(
									propertyrecord
								)
							);
						}
					} else {
						for (const propertyrecord of this.rows) {
							if (
								!propertyrecords.find(
									(localPropertyrecord) =>
										localPropertyrecord._id ===
										propertyrecord._id
								)
							) {
								await firstValueFrom(
									this._propertyrecordService.delete(
										propertyrecord
									)
								);
							}
						}

						for (const propertyrecord of propertyrecords) {
							const localPropertyrecord = this.rows.find(
								(localPropertyrecord) =>
									localPropertyrecord._id ===
									propertyrecord._id
							);

							if (localPropertyrecord) {
								this._core.copy(
									propertyrecord,
									localPropertyrecord
								);

								await firstValueFrom(
									this._propertyrecordService.update(
										localPropertyrecord
									)
								);
							} else {
								this._preCreate(propertyrecord);

								await firstValueFrom(
									this._propertyrecordService.create(
										propertyrecord
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(propertyrecord: Propertyrecord): void {
		propertyrecord.__created = false;

		if (this.property_id) {
			propertyrecord.property_id = this.property_id;
		}
	}
	private _query(): string {
		let query = '';
		if (this.property_id) {
			query += (query ? '&' : '') + 'property=' + this.property_id;
		}
		return query;
	}
}
