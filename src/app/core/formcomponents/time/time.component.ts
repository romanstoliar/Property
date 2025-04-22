import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
interface Interface {}
@Component({
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    standalone: false
})
export class TimeComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Time', this.templateRef);
	}
}
