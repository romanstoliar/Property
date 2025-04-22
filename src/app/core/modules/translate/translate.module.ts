import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateDirective } from './translate.directive';
import { WacomModule } from 'wacom';
import { TranslatePipe } from './translate.pipe';

@NgModule({
	imports: [CommonModule, FormsModule, WacomModule],
	declarations: [TranslateDirective, TranslatePipe],
	exports: [TranslateDirective, TranslatePipe],
	providers: []
})
export class TranslateModule {}
