import { NgModule } from '@angular/core';
import { CollapseComponent } from './collapse.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule],
	declarations: [CollapseComponent],
	providers: [],
	exports: [CollapseComponent]
})
export class CollapseModule {}
