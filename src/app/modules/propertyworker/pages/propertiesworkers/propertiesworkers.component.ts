import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertyworkerService } from '../../services/propertyworker.service';
import { Propertyworker } from '../../interfaces/propertyworker.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyworkerFormComponents } from '../../formcomponents/propertyworker.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './propertiesworkers.component.html',
	styleUrls: ['./propertiesworkers.component.scss'],
	standalone: false
})
export class PropertiesworkersComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'propertyworker',
		propertyworkerFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertyworkerService.setPerPage.bind(
			this._propertyworkerService
		),
		allDocs: false,
		create: this._router.url.includes('propertiesworkers/')
			? (): void => {
					this._form.modal<Propertyworker>(this.form, {
						label: 'Create',
						click: async (created: unknown, close: () => void) => {
							close();

							this._preCreate(created as Propertyworker);

							await firstValueFrom(
								this._propertyworkerService.create(
									created as Propertyworker
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Propertyworker): void => {
			this._form
				.modal<Propertyworker>(this.form, [], doc)
				.then((updated: Propertyworker) => {
					this._core.copy(updated, doc);

					this._propertyworkerService.update(doc);
				});
		},
		delete: (doc: Propertyworker): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this propertyworker?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._propertyworkerService.delete(doc)
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
				click: (doc: Propertyworker): void => {
					this._form.modalUnique<Propertyworker>(
						'propertyworker',
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

	rows: Propertyworker[] = [];

	provider_id = '';

	constructor(
		private _translate: TranslateService,
		private _propertyworkerService: PropertyworkerService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.setRows();

		this._route.paramMap.subscribe((params) => {
			this.provider_id = params.get('provider_id') || '';
			console.log(this.provider_id);
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._propertyworkerService
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
				.modalDocs<Propertyworker>(create ? [] : this.rows)
				.then(async (propertyworkers: Propertyworker[]) => {
					if (create) {
						for (const propertyworker of propertyworkers) {
							this._preCreate(propertyworker);

							await firstValueFrom(
								this._propertyworkerService.create(
									propertyworker
								)
							);
						}
					} else {
						for (const propertyworker of this.rows) {
							if (
								!propertyworkers.find(
									(localPropertyworker) =>
										localPropertyworker._id ===
										propertyworker._id
								)
							) {
								await firstValueFrom(
									this._propertyworkerService.delete(
										propertyworker
									)
								);
							}
						}

						for (const propertyworker of propertyworkers) {
							const localPropertyworker = this.rows.find(
								(localPropertyworker) =>
									localPropertyworker._id ===
									propertyworker._id
							);

							if (localPropertyworker) {
								this._core.copy(
									propertyworker,
									localPropertyworker
								);

								await firstValueFrom(
									this._propertyworkerService.update(
										localPropertyworker
									)
								);
							} else {
								this._preCreate(propertyworker);

								await firstValueFrom(
									this._propertyworkerService.create(
										propertyworker
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(propertyworker: Propertyworker): void {
		propertyworker.__created = false;

		if (this.provider_id) {
			propertyworker.provider = this.provider_id;
		}
	}
	private _query(): string {
		let query = '';
		if (this.provider_id) {
			query += (query ? '&' : '') + 'property=' + this.provider_id;
		}
		return query;
	}
}
