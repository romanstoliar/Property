import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}
@Component({
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
    standalone: false
})
export class NumberComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Number', this.templateRef);
	}
}
