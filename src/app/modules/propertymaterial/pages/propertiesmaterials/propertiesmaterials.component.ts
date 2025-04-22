import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { PropertymaterialService } from '../../services/propertymaterial.service';
import { Propertymaterial } from '../../interfaces/propertymaterial.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertymaterialFormComponents } from '../../formcomponents/propertymaterial.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './propertiesmaterials.component.html',
	styleUrls: ['./propertiesmaterials.component.scss'],
	standalone: false,
})
export class PropertiesmaterialsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('propertymaterial', propertymaterialFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._propertymaterialService.setPerPage.bind(this._propertymaterialService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Propertymaterial>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Propertymaterial);

					await firstValueFrom(
						this._propertymaterialService.create(created as Propertymaterial)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Propertymaterial): void => {
			this._form
				.modal<Propertymaterial>(this.form, [], doc)
				.then((updated: Propertymaterial) => {
					this._core.copy(updated, doc);

					this._propertymaterialService.update(doc);
				});
		},
		delete: (doc: Propertymaterial): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this propertymaterial?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._propertymaterialService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Propertymaterial): void => {
					this._form.modalUnique<Propertymaterial>('propertymaterial', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Propertymaterial[] = [];

	constructor(
		private _translate: TranslateService,
		private _propertymaterialService: PropertymaterialService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._propertymaterialService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Propertymaterial>(create ? [] : this.rows)
				.then(async (propertymaterials: Propertymaterial[]) => {
					if (create) {
						for (const propertymaterial of propertymaterials) {
							this._preCreate(propertymaterial);

							await firstValueFrom(
								this._propertymaterialService.create(propertymaterial)
							);
						}
					} else {
						for (const propertymaterial of this.rows) {
							if (
								!propertymaterials.find(
									(localPropertymaterial) => localPropertymaterial._id === propertymaterial._id
								)
							) {
								await firstValueFrom(
									this._propertymaterialService.delete(propertymaterial)
								);
							}
						}

						for (const propertymaterial of propertymaterials) {
							const localPropertymaterial = this.rows.find(
								(localPropertymaterial) => localPropertymaterial._id === propertymaterial._id
							);

							if (localPropertymaterial) {
								this._core.copy(propertymaterial, localPropertymaterial);

								await firstValueFrom(
									this._propertymaterialService.update(localPropertymaterial)
								);
							} else {
								this._preCreate(propertymaterial);

								await firstValueFrom(
									this._propertymaterialService.create(propertymaterial)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(propertymaterial: Propertymaterial): void {
		delete propertymaterial.__created;
	}
}
