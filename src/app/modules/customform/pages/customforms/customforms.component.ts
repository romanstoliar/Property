import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import {
	CustomformService,
	Customform
} from '../../services/customform.service';
import { AlertService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormComponentInterface } from 'src/app/core/modules/form/interfaces/component.interface';

@Component({
    templateUrl: './customforms.component.html',
    styleUrls: ['./customforms.component.scss'],
    standalone: false
})
export class CustomformsComponent {
	columns = ['formId', 'components', 'active'];

	form: FormInterface = this._form.getForm('form', {
		formId: 'form',
		title: 'Custom form',
		components: [
			{
				name: 'Text',
				key: 'title',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Select',
				key: 'formId',
				fields: [
					{
						name: 'Placeholder',
						value: 'Select form id'
					},
					{
						name: 'Label',
						value: 'Form ID'
					},
					{
						name: 'Items',
						value: this._form.formIds
					}
				]
			}
		]
	});

	components: FormComponentInterface[] = [];
	formComponents: FormInterface = this._form.getForm('formComponents', {
		formId: 'formComponents',
		title: 'Custom components',
		components: [
			{
				components: this.components
			},
			{
				name: 'Select',
				key: 'addComponent',
				fields: [
					{
						name: 'Placeholder',
						value: 'Select form componnet'
					},
					{
						name: 'Label',
						value: 'Form Component'
					},
					{
						name: 'Value',
						value: 'name',
						skipTranslation: true
					},
					{
						name: 'Items',
						value: this._form.getTemplateComponentsNames()
					}
				]
			}
		]
	});

	config = {
		create: (): void => {
			this._form
				.modal<Customform>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._cfs.create(created as Customform, {
							callback: close.bind(this)
						});
					}
				})
				.then(this._cfs.create.bind(this));
		},
		update: (form: Customform): void => {
			this._form
				.modal<Customform>(
					this.form,
					{
						label: 'Update',
						click: (updated: unknown, close: () => void) => {
							this._cfs.update(updated as Customform, {
								callback: close.bind(this)
							});
						}
					},
					form
				)
				.then(this._cfs.update.bind(this));
		},
		delete: (form: Customform): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this user?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._cfs.delete(form);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'text_fields',
				click: (doc: Customform): void => {
					console.log(this.formComponents);

					this.components.splice(0, this.components.length);

					const submition: Record<string, unknown> = {
						addComponent: 'Text'
					};

					doc.components = doc.components || [];

					for (let i = doc.components.length - 1; i >= 0; i--) {
						const fields = this._form.getTemplateFields(
							doc.components[i].name
						);

						doc.components[i].fields = doc.components[
							i
						].fields.filter((f) => fields.includes(f.name));

						for (const name of fields) {
							if (
								!doc.components[i].fields.find(
									(f) => f.name === name
								)
							) {
								doc.components[i].fields.push({
									value: '',
									name
								});
							}
						}

						submition['key' + i] = doc.components[i].key as string;

						for (const field of doc.components[i].fields) {
							submition[field.name + i] = field.value;
						}
					}

					const remove = (i: number): void => {
						this.components.splice(i, 1);

						doc.components.splice(i, 1);

						this._cfs.updateAfterWhile(doc);
					};

					(doc.components || []).forEach((component) => {
						this.components.push(
							this._addCustomComponent(
								component.name,
								this.components.length,
								remove
							)
						);
					});

					this._form
						.modal<Customform>(
							this.formComponents,
							{
								label: 'Add component',
								click: (): void => {
									const component: string = submition[
										'addComponent'
									] as string;

									this.components.push(
										this._addCustomComponent(
											component,
											this.components.length,
											remove
										)
									);

									doc.components.push({
										name: submition[
											'addComponent'
										] as string,
										fields: this._form
											.getTemplateFields(component)
											.map((name) => {
												return {
													value: '',
													name
												};
											})
									});
								}
							},
							submition,
							() => {},
							{ size: 'big' }
						)
						.then(() => {
							for (let i = 0; i < doc.components.length; i++) {
								doc.components[i].key = submition[
									'key' + i
								] as string;

								for (const field of doc.components[i].fields) {
									field.value = submition[
										field.name + i
									] as string;
								}
							}

							this._cfs.updateAfterWhile(doc);
						});
				}
			}
		]
	};

	get rows(): FormInterface[] {
		return this._cfs.customforms;
	}

	constructor(
		private _translate: TranslateService,
		private _cfs: CustomformService,
		private _alert: AlertService,
		private _form: FormService
	) {}

	private _addCustomComponent(
		component: string,
		index: number,
		remove: (i: number) => void
	): FormComponentInterface {
		const templateFields = this._form
			.getTemplateFields(component)
			.map((f) => {
				return {
					name:
						this._form.getCustomTemplateFields(component)[f] ||
						'Text',
					key: f + index,
					fields: [
						{
							name: 'Placeholder',
							value: 'fill ' + f
						},
						{
							name: 'Label',
							value:
								f.charAt(0).toUpperCase() + f.slice(1, f.length)
						}
					]
				};
			});

		const components = [
			{
				name: 'Text',
				key: 'key' + index,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill key'
					},
					{
						name: 'Label',
						value: 'Key'
					}
				]
			},
			...templateFields,
			{
				name: 'Button',
				fields: [
					{
						name: 'Label',
						value: 'Remove'
					},
					{
						name: 'Click',
						value: (): void => {
							remove(index);
						}
					}
				]
			}
		];

		return {
			class: 'd-f mt10',
			components
		};
	}

	changeStatus(form: Customform): void {
		setTimeout(() => {
			if (form.active) {
				for (const customForm of this._cfs.customforms) {
					if (
						customForm._id === form._id ||
						customForm.formId !== form.formId
					)
						continue;

					if (customForm.active) {
						customForm.active = false;

						this._cfs.updateAfterWhile(customForm);
					}
				}
			}

			this._cfs.updateAfterWhile(form);
		});
	}
}
