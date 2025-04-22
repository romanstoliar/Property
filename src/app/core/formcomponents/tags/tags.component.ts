import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    standalone: false
})
export class TagsComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Tags', this.templateRef);
	}

	@ViewChild('inputRef', { static: false }) inputRef: any;

	addTag(data: any): void {
		data.submition[data.key] = data.submition[data.key] || [];

		data.submition[data.key].push(this.inputRef.value.replace('\n', ''));

		this.inputRef.value = '';

		data.wChange.emit();

		setTimeout(() => {
			this.inputRef.focus();
		}, 100);
	}
}
