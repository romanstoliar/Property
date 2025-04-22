import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertyproviderService } from '../../services/propertyprovider.service';
import { Propertyprovider } from '../../interfaces/propertyprovider.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyproviderFormComponents } from '../../formcomponents/propertyprovider.formcomponents';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: './propertiesproviders.component.html',
	styleUrls: ['./propertiesproviders.component.scss'],
	standalone: false
})
export class PropertiesprovidersComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'propertyprovider',
		propertyproviderFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertyproviderService.setPerPage.bind(
			this._propertyproviderService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Propertyprovider>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Propertyprovider);

					await firstValueFrom(
						this._propertyproviderService.create(
							created as Propertyprovider
						)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Propertyprovider): void => {
			this._form
				.modal<Propertyprovider>(this.form, [], doc)
				.then((updated: Propertyprovider) => {
					this._core.copy(updated, doc);

					this._propertyproviderService.update(doc);
				});
		},
		delete: (doc: Propertyprovider): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this propertyprovider?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._propertyproviderService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'engineering',
				hrefFunc: (doc: Propertyprovider): string => {
					return '/propertiesworkers/' + doc._id;
				}
			},
			{
				icon: 'build',
				hrefFunc: (doc: Propertyprovider): string => {
					return '/propertiesservices/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Propertyprovider): void => {
					this._form.modalUnique<Propertyprovider>(
						'propertyprovider',
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

	rows: Propertyprovider[] = [];

	constructor(
		private _translate: TranslateService,
		private _propertyproviderService: PropertyproviderService,
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
				this._propertyproviderService
					.get({ page })
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
				.modalDocs<Propertyprovider>(create ? [] : this.rows)
				.then(async (propertyproviders: Propertyprovider[]) => {
					if (create) {
						for (const propertyprovider of propertyproviders) {
							this._preCreate(propertyprovider);

							await firstValueFrom(
								this._propertyproviderService.create(
									propertyprovider
								)
							);
						}
					} else {
						for (const propertyprovider of this.rows) {
							if (
								!propertyproviders.find(
									(localPropertyprovider) =>
										localPropertyprovider._id ===
										propertyprovider._id
								)
							) {
								await firstValueFrom(
									this._propertyproviderService.delete(
										propertyprovider
									)
								);
							}
						}

						for (const propertyprovider of propertyproviders) {
							const localPropertyprovider = this.rows.find(
								(localPropertyprovider) =>
									localPropertyprovider._id ===
									propertyprovider._id
							);

							if (localPropertyprovider) {
								this._core.copy(
									propertyprovider,
									localPropertyprovider
								);

								await firstValueFrom(
									this._propertyproviderService.update(
										localPropertyprovider
									)
								);
							} else {
								this._preCreate(propertyprovider);

								await firstValueFrom(
									this._propertyproviderService.create(
										propertyprovider
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(propertyprovider: Propertyprovider): void {
		delete propertyprovider.__created;
	}
}
