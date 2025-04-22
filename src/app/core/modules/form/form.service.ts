import {
	ComponentFactoryResolver,
	ApplicationRef,
	TemplateRef,
	Injectable,
	Injector,
	Type
} from '@angular/core';
import { ModalService, StoreService } from 'wacom';
import { TemplateFieldInterface } from './interfaces/component.interface';
import { FormInterface } from './interfaces/form.interface';
import { ModalFormComponent } from './modals/modal-form/modal-form.component';
import { TranslateService } from '../translate/translate.service';
import { ModalUniqueComponent } from './modals/modal-unique/modal-unique.component';
import { environment } from 'src/environments/environment';
import { CustomformService } from 'src/app/modules/customform/services/customform.service';
import { Modal } from 'wacom/lib/interfaces/modal.interface';

export interface FormModalButton {
	/** Function to execute on button click */
	click: (submition: unknown, close: () => void) => void;
	/** Label for the button */
	label: string;
	/** CSS class for the button (optional) */
	class?: string;
}

interface Docs {
	docs: string;
}

@Injectable({
	providedIn: 'root'
})
export class FormService {
	/** Application ID from the environment configuration */
	readonly appId = (environment as unknown as { appId: string }).appId;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private _cfs: CustomformService,
		private _translate: TranslateService,
		private _modal: ModalService,
		private _store: StoreService,
		private appRef: ApplicationRef,
		private injector: Injector
	) {
		/** Load form IDs from the store */
		this._store.getJson('formIds', (formIds: string[]) => {
			if (Array.isArray(formIds)) {
				this.formIds.push(...formIds);
			}
		});
	}

	private _injectedComponent: Record<string, boolean> = {};
	templateFields: Record<string, string[]> = {};
	getTemplateFields(name: string): string[] {
		return this.templateFields[name] || ['Placeholder', 'Label'];
	}
	setTemplateFields(
		name: string,
		fields: string[],
		customFields: Record<string, string> = {}
	): void {
		this.templateFields[name] = fields;

		this.customTemplateFields[name] = {
			...(this.customTemplateFields[name] || {}),
			...customFields
		};
	}
	customTemplateFields: Record<string, Record<string, string>> = {};
	getCustomTemplateFields(name: string): Record<string, string> {
		return this.customTemplateFields[name] || {};
	}
	injectComponent<T>(
		name: string,
		component: Type<T>,
		fields = ['Placeholder', 'Label'],
		customFields: Record<string, string> = {}
	): void {
		if (!this._injectedComponent[name]) {
			this._injectedComponent[name] = true;

			this.templateFields[name] = fields;

			this.customTemplateFields[name] = customFields;

			const componentFactory =
				this.componentFactoryResolver.resolveComponentFactory(
					component
				);

			const componentRef = componentFactory.create(this.injector);

			this.appRef.attachView(componentRef.hostView);

			const domElem = (
				componentRef.hostView as unknown as { rootNodes: HTMLElement[] }
			).rootNodes[0];

			document.body.appendChild(domElem);
		}
	}
	private _templateComponent: Record<string, TemplateRef<unknown>> = {};
	addTemplateComponent<T>(name: string, template: TemplateRef<T>): void {
		if (!this._templateComponent[name]) {
			this._templateComponent[name] = template;
		}
	}
	getTemplateComponent(name: string): TemplateRef<unknown> | undefined {
		return this._templateComponent[name];
	}
	getTemplateComponentsNames(): string[] {
		const names = [];

		for (const name in this._templateComponent) {
			names.push(name);
		}

		return names;
	}

	/** Translates the form title and its components' fields */
	translateForm(form: FormInterface): void {
		if (form.title) {
			form.title = this._translate.translate(
				`Form_${form.formId}.${form.title}`,
				(title: string) => {
					form.title = title;
				}
			);

			for (const component of form.components) {
				for (const field of component.fields || []) {
					this.translateFormComponent(form, field);
				}
			}
		}
	}
	/** Translates individual form components' fields */
	translateFormComponent(
		form: FormInterface,
		field: TemplateFieldInterface
	): void {
		const fieldValue = field.value;

		if (typeof fieldValue === 'string' && !field.skipTranslation) {
			field.value = this._translate.translate(
				`Form_${form.formId}.${fieldValue}`,
				(value: string) => {
					field.value = value;
				}
			);
		}
	}

	/** List of forms managed by the service */
	forms: FormInterface[] = [];

	/** List of form IDs managed by the service */
	formIds: string[] = [];

	/** Creates a default form with specified components */
	getDefaultForm(
		id: string,
		components = ['name', 'description']
	): FormInterface {
		if (this.formIds.indexOf(id) === -1) {
			this.formIds.push(id);

			this._store.setJson('formIds', this.formIds);
		}

		const form = {
			id,
			components: components.map((key, index) => {
				const name = key.includes('.') ? key.split('.')[1] : 'Text';

				return {
					name,
					key,
					focused: !index,
					fields: [
						{
							name: 'Placeholder',
							value: 'Enter your ' + key.split('.')[0]
						},
						{
							name: 'Label',
							value: key.split('.')[0].capitalize()
						}
					]
				};
			})
		};

		return form;
	}

	/** Retrieves a form by its ID, initializing it if necessary */
	getForm(formId: string, form?: FormInterface): FormInterface {
		if (
			form &&
			this.forms.map((c) => c.formId).indexOf(form?.formId) === -1
		) {
			this.forms.push(form);
		}

		if (this.formIds.indexOf(formId) === -1) {
			this.formIds.push(formId);

			this._store.setJson('formIds', this.formIds);
		}

		form = form || this.forms.find((f) => f.formId === formId);

		form = form || this.getDefaultForm(formId);

		if (form) {
			for (const component of form.components) {
				component.root = true;
			}
		}

		const customForms = this._cfs.customforms.filter(
			(f) => f.active && f.formId === formId
		);

		form.formId = formId;

		for (const customForm of customForms) {
			form.title = form.title || customForm.name;

			form.class = form.class || customForm.class;

			for (const component of customForm.components) {
				component.root = false;

				form.components.push(component);
			}
		}

		this.translateForm(form);

		return form;
	}

	/** Shows a modal form with specified options */
	modal<T>(
		form: FormInterface | FormInterface[],
		buttons: FormModalButton | FormModalButton[] = [],
		submition: unknown = {},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		change = (update: T): void => {},
		modalOptions: Modal = {}
	): Promise<T> {
		return new Promise((resolve) => {
			this._modal.show({
				...modalOptions,
				component: ModalFormComponent,
				class: 'forms_modal',
				size: 'big',
				form,
				buttons: Array.isArray(buttons) ? buttons : [buttons],
				submition,
				onClose: function () {
					resolve(this.submition as T);
				},
				submit: (update: T) => {
					resolve(update);
				},
				change: (update: T) => {
					if (typeof change === 'function') {
						change(update);
					}
				}
			});
		});
	}

	/** Shows a modal form with docs in ace editor */
	modalDocs<T>(docs: T[]): Promise<T[]> {
		return new Promise((resolve) => {
			const submition = {
				docs: JSON.stringify(docs.length ? docs : [], null, 4)
			};

			this._modal.show({
				component: ModalFormComponent,
				class: 'forms_modal',
				size: 'big',
				submition,
				form: {
					title: 'Modify content of documents',
					components: [
						{
							name: 'Code',
							key: 'docs',
							fields: [
								{
									name: 'Placeholder',
									value: 'fill content of documents'
								}
							]
						}
					]
				},
				onClose: function () {
					const docs: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];

					resolve(docs);
				},
				submit: () => {
					const docs: T[] = submition.docs
						? JSON.parse(submition.docs)
						: [];

					resolve(docs);
				}
			});
		});
	}

	/** Shows a modal with a unique component */
	modalUnique<T>(
		module: string,
		field: string,
		doc: T,
		component: string = '',
		onClose = (): void => {}
	): void {
		this._modal.show({
			component: ModalUniqueComponent,
			form: this.getDefaultForm('unique', [
				field + (component ? '.' + component : '')
			]),
			module,
			field,
			doc,
			class: 'forms_modal',
			onClose
		});
	}
}
