import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertytradeService } from '../../services/propertytrade.service';
import { Propertytrade } from '../../interfaces/propertytrade.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertytradeFormComponents } from '../../formcomponents/propertytrade.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './propertiestrades.component.html',
	styleUrls: ['./propertiestrades.component.scss'],
	standalone: false
})
export class PropertiestradesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'propertytrade',
		propertytradeFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertytradeService.setPerPage.bind(
			this._propertytradeService
		),
		allDocs: false,
		create: this._router.url.includes('propertiestrades/')
			? (): void => {
					this._form.modal<Propertytrade>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Propertytrade);

							await firstValueFrom(
								this._propertytradeService.create(
									created as Propertytrade
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Propertytrade): void => {
			this._form
				.modal<Propertytrade>(this.form, [], doc)
				.then((updated: Propertytrade) => {
					this._core.copy(updated, doc);

					this._propertytradeService.update(doc);
				});
		},
		delete: (doc: Propertytrade): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this propertytrade?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._propertytradeService.delete(doc)
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
				click: (doc: Propertytrade): void => {
					this._form.modalUnique<Propertytrade>(
						'propertytrade',
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

	rows: Propertytrade[] = [];

	property_id = '';

	constructor(
		private _translate: TranslateService,
		private _propertytradeService: PropertytradeService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
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
				this._propertytradeService
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
				.modalDocs<Propertytrade>(create ? [] : this.rows)
				.then(async (propertytrades: Propertytrade[]) => {
					if (create) {
						for (const propertytrade of propertytrades) {
							this._preCreate(propertytrade);

							await firstValueFrom(
								this._propertytradeService.create(propertytrade)
							);
						}
					} else {
						for (const propertytrade of this.rows) {
							if (
								!propertytrades.find(
									(localPropertytrade) =>
										localPropertytrade._id ===
										propertytrade._id
								)
							) {
								await firstValueFrom(
									this._propertytradeService.delete(
										propertytrade
									)
								);
							}
						}

						for (const propertytrade of propertytrades) {
							const localPropertytrade = this.rows.find(
								(localPropertytrade) =>
									localPropertytrade._id === propertytrade._id
							);

							if (localPropertytrade) {
								this._core.copy(
									propertytrade,
									localPropertytrade
								);

								await firstValueFrom(
									this._propertytradeService.update(
										localPropertytrade
									)
								);
							} else {
								this._preCreate(propertytrade);

								await firstValueFrom(
									this._propertytradeService.create(
										propertytrade
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(propertytrade: Propertytrade): void {
		propertytrade.__created = false;

		if (this.property_id) {
			propertytrade.property = this.property_id;
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
