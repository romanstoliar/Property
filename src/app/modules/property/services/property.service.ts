import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property.interface';
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
export class PropertyService extends CrudService<Property> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'property',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
