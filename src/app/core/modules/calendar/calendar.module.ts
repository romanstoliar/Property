import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { ButtonModule } from '../button/button.module';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [CalendarComponent],
	imports: [CommonModule, ButtonModule],
	exports: [CalendarComponent]
})
export class CalendarModule {}
