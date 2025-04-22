import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	selector: 'app-mutate-form',
	templateUrl: './mutate-form.component.html',
	styleUrls: ['./mutate-form.component.scss']
})
export class MutateFormComponent {
	close: () => void;

	form: FormInterface = this.fs.new();

	addComponent = '';

	addField() {
		const component = this.fs.components.filter(
			(c) => c.name === this.addComponent
		)[0];

		this.form.components.push({
			name: component.name,
			fields: (component.fields||[]).map((f) => {
				return {
					name: f,
					value: ''
				};
			})
		});
	}

	constructor(public fs: FormService) {}
}
