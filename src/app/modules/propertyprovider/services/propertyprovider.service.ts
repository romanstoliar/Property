import { Injectable } from '@angular/core';
import { Propertyprovider } from '../interfaces/propertyprovider.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class PropertyproviderService extends CrudService<Propertyprovider> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertyprovider',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
