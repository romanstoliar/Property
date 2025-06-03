import { UserService } from 'src/app/modules/user/services/user.service';
import { coreAnimation } from '../../animations/core.animations';
import { environment } from 'src/environments/environment';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import {
	TranslateService,
	Language
} from '../../modules/translate/translate.service';
@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	animations: [coreAnimation],
	standalone: false
})
export class UserComponent {
	readonly url = environment.url;
	forceAvatarUrl = '';
	showSidebar = false;
	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar = false;
		}
	}

	constructor(
		public us: UserService,
		private _platform: Platform,
		public _translate: TranslateService
	) {}
	getTranslatedText(toTranslate: string) {
		return this._translate.translate(toTranslate);
	}
	set_language(code: string) {
		this._translate.set_language(
			this._translate.languages.find((l) => l.code === code) as Language
		);
	}
}
