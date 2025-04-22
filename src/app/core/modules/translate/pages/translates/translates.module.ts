import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatesComponent } from './translates.component';
import { WacomModule } from 'wacom';
import { TranslateModule } from '../../translate.module';
import { ButtonModule } from 'src/app/core/modules/button/button.module';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { SelectModule } from 'src/app/core/modules/select/select.module';

const routes: Routes = [
	{
		path: '',
		component: TranslatesComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		TranslateModule,
		CommonModule,
		ButtonModule,
		FormsModule,
		TableModule,
		WacomModule,
		SelectModule
	],
	declarations: [TranslatesComponent],
	providers: []
})
export class TranslatesModule {}
