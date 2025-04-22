import { Component } from '@angular/core';
import { FormInterface } from '../../interfaces/form.interface';
import { MongoService } from 'wacom';

@Component({
    selector: 'app-modal-unique',
    templateUrl: './modal-unique.component.html',
    styleUrls: ['./modal-unique.component.scss'],
    standalone: false
})
export class ModalUniqueComponent {
	constructor(private _mongo: MongoService) {}
	form: FormInterface;
	module: string;
	field: string;
	// eslint-disable-next-line
	doc: any;
	get getDoc(): Record<string, unknown> {
		return this.doc as Record<string, unknown>;
	}
	change(): void {
		this._mongo.unique(
			this.module,
			this.doc,
			{
				name: this.field
			},
			(resp: string) => {
				if (this.doc[this.field] !== resp) {
					this.doc[this.field] = resp;
				}
			}
		);
	}
}
