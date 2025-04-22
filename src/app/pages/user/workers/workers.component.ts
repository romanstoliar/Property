import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { propertyworkerFormComponents } from 'src/app/modules/propertyworker/formcomponents/propertyworker.formcomponents';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';
import { PropertyworkerService } from 'src/app/modules/propertyworker/services/propertyworker.service';

@Component({
	templateUrl: './workers.component.html',
	styleUrls: ['./workers.component.scss'],
	standalone: false
})
export class WorkersComponent {
	isMenuOpen = false;
	workers: Propertyworker[] = [];

	constructor(
		private _propertyworkerService: PropertyworkerService,
		private _form: FormService
	) {}

	ngOnInit(): void {
		this.loadWorkers();
	}

	/** Метод завантаження списку працівників */
	private loadWorkers(): void {
		this._propertyworkerService
			.get()
			.subscribe((data: Propertyworker[]) => {
				this.workers = data;
			});
	}
	load(): void {
		this.loadWorkers();
	}

	/** Форма для створення нового працівника */
	form: FormInterface = this._form.getForm(
		'propertyworker',
		propertyworkerFormComponents
	);

	/** Метод створення нового працівника */
	create(): void {
		this._form.modal<Propertyworker>(this.form, {
			label: 'Create',
			click: async (created: unknown, close: () => void) => {
				close();

				this._preCreate(created as Propertyworker);

				this._propertyworkerService
					.create(created as Propertyworker)
					.subscribe(() => {
						this.loadWorkers();
					});
			}
		});
	}

	/** Попередня обробка перед створенням */
	private _preCreate(worker: Propertyworker): void {
		delete worker.__created; // Видаляємо системне поле, якщо воно є
	}
}
