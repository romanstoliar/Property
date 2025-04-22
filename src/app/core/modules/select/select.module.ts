import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
import { SelectComponent } from './select.component';

@NgModule({
	imports: [FormsModule, CommonModule, WacomModule],
	declarations: [SelectComponent],
	providers: [],
	exports: [SelectComponent]
})
export class SelectModule {}
