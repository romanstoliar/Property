import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    standalone: false
})
export class EmailComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Email', this.templateRef);
	}
}
