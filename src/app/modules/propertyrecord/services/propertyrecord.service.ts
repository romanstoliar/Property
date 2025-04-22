import { Injectable } from '@angular/core';
import { Propertyrecord } from '../interfaces/propertyrecord.interface';
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
export class PropertyrecordService extends CrudService<Propertyrecord> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertyrecord',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
