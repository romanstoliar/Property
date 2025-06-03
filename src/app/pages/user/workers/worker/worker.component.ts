import { Component, Input } from '@angular/core';
import { Propertyworker } from 'src/app/modules/propertyworker/interfaces/propertyworker.interface';
import { environment } from 'src/environments/environment.prod';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Component({
	selector: 'app-worker',
	standalone: false,
	templateUrl: './worker.component.html',
	styleUrl: './worker.component.scss'
})
export class WorkerComponent {
	@Input() worker: Propertyworker;
	@Input() provider: Propertyworker;
	apiUrl = environment.url;

	constructor(private _translate: TranslateService) {}

	getTranslatedText(key: string): string {
		return this._translate.translate(key);
	}

	onImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.src = 'assets/user.png';
	}
}
