import { Component } from '@angular/core';
import { FormModalButton } from '../../form.service';
import { FormInterface } from '../../interfaces/form.interface';
import { CoreService } from 'wacom';

@Component({
	templateUrl: './modal-form.component.html',
	styleUrls: ['./modal-form.component.scss'],
	standalone: false
})
export class ModalFormComponent {
	form: FormInterface;

	submition: Record<string, unknown>;

	set(submition: Record<string, unknown>): void {
		this._core.copy(submition, this.submition);

		this._core.copy(submition['data'], this.submition['data']);
	}

	close: () => void;
	// eslint-disable-next-line
	submit: (form: any) => void;
	// eslint-disable-next-line
	change: (form: any) => void;

	buttons: FormModalButton[];

	constructor(private _core: CoreService) {}
}
