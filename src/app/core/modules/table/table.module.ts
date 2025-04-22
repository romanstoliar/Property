import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WacomModule } from 'wacom';
import {
	ActionsDirective,
	CellDirective,
	CustomEditDirective,
	SortDirective
} from './table.directive';
import { ButtonModule } from '../button/button.module';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { PerPagePipe } from './per-page.pipe';
import { FormModule } from '../form/form.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		WacomModule,
		FormModule,
		ButtonModule,
		RouterModule,
		InputModule
	],
	declarations: [
		TableComponent,
		CellDirective,
		SortDirective,
		ActionsDirective,
		CustomEditDirective,
		PerPagePipe
	],
	providers: [],
	exports: [
		TableComponent,
		CellDirective,
		SortDirective,
		ActionsDirective,
		CustomEditDirective
	]
})
export class TableModule {}
