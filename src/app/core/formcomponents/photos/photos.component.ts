import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';
interface Interface { }
@Component({
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
    standalone: false
})
export class PhotosComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) { }
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Photos', this.templateRef);
	}
}
