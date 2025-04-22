import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import { UiService } from 'wacom';
interface Interface {}
@Component({
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    standalone: false
})
export class PasswordComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService, public ui: UiService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>(
			'Password',
			this.templateRef
		);
	}
}
