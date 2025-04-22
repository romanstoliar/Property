import { Component, Input } from '@angular/core';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';

@Component({
	selector: 'app-worker',
	standalone: false,

	templateUrl: './worker.component.html',
	styleUrl: './worker.component.scss'
})
export class WorkerComponent {
	@Input() worker: Propertyworker;
	@Input() provider: Propertyworker;
}
