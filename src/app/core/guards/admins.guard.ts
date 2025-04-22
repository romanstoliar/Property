import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AdminsGuard {
	constructor(private router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			const user = JSON.parse(localStorage.getItem('waw_user') as string);

			if (user.is && user.is.admin) return true;

			this.router.navigate(['/profile']);

			return false;
		} else {
			this.router.navigate(['/sign']);

			return false;
		}
	}
}
