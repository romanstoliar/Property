import { UserService } from 'src/app/modules/user/services/user.service';
import { coreAnimation } from '../../animations/core.animations';
import { environment } from 'src/environments/environment';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
	animations: [coreAnimation],
	standalone: false
})
export class UserComponent {
	isMenuOpen = false;
	readonly url = environment.url;
	forceAvatarUrl = '';
	showSidebar = false;

	constructor(
		public us: UserService,
		private _platform: Platform,
		private router: Router
	) {
		// ❗ Закриває сайдбар при кожному переході по маршрутах
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				this.hideSidebar();
			});
	}

	hideSidebar(): void {
		// ❗ Працює і на десктопі, і на мобільному — можна прибрати обмеження
		this.showSidebar = false;
	}
}
