import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticatedGuard {
	constructor(private router: Router) {}

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			return true;
		} else {
			this.router.navigateByUrl('/sign');

			return false;
		}
	}
}
