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
	currentTime = '';
	currentDate = '';
	hideSidebar(): void {
		if (!this._platform.ANDROID && !this._platform.IOS) {
			this.showSidebar = false;
		}
	}

	ngOnInit(): void {
		this.showSidebar = false;

		setInterval(() => {
			const now = new Date();

			this.currentTime = now.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			});

			this.currentDate = now.toLocaleDateString(this.currentLocale, {
				weekday: 'long',
				day: 'numeric',
				month: 'long'
			});
		}, 1000);
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
	get currentLocale(): string {
		return this._translate.language.code === 'uk' ? 'uk-UA' : 'en-US';
	}
	getLanguageLabel(code: string): string {
		const currentLang = this._translate.language.code;

		const map: Record<string, Record<string, string>> = {
			uk: {
				en: 'АНГЛ',
				uk: 'УКР'
			},
			en: {
				en: 'EN',
				uk: 'UK'
			}
		};

		return map[currentLang]?.[code] || code.toUpperCase();
	}
}
