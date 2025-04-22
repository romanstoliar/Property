import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';

interface Interface {}

@Component({
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss'],
	standalone: false
})
export class CodeComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Code', this.templateRef);
	}
}
