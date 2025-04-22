import { Injectable } from '@angular/core';
import { Propertyworker } from '../interfaces/propertyworker.interface';
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
export class PropertyworkerService extends CrudService<Propertyworker> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertyworker',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
