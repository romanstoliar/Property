import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    standalone: false
})
export class DateComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Date', this.templateRef);
	}
}
