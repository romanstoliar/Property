import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ModalFormComponent } from './modals/modal-form/modal-form.component';
import { ModalFormButtonComponent } from './modals/modal-form/modal-form-button/modal-form-button.component';
import { ModalUniqueComponent } from './modals/modal-unique/modal-unique.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';

@NgModule({
	imports: [CommonModule, ButtonModule],
	declarations: [
		FormComponent,
		FormComponentComponent,
		ModalFormComponent,
		ModalFormButtonComponent,
		ModalUniqueComponent
	],
	exports: [FormComponent]
})
export class FormModule {}
