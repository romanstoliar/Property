import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
import { CardComponent } from './card.component';

@NgModule({
	imports: [FormsModule, CommonModule, WacomModule],
	declarations: [CardComponent],
	providers: [],
	exports: [CardComponent]
})
export class CardModule {}
