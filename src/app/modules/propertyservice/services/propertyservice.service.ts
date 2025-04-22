import { Injectable } from '@angular/core';
import { Propertyservice } from '../interfaces/propertyservice.interface';
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
export class PropertyserviceService extends CrudService<Propertyservice> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertyservice',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
