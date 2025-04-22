import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyproviderService } from 'src/app/modules/propertyprovider/services/propertyprovider.service';

@Component({
	templateUrl: './provider.component.html',
	styleUrls: ['./provider.component.scss'],
	standalone: false
})
export class ProviderComponent {
	provider = this._propertyproviderService.doc(
		this._router.url.replace('/business/', '')
	);
	constructor(
		private _propertyproviderService: PropertyproviderService,
		private _router: Router
	) {}
}
