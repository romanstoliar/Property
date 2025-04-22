import { Injectable } from '@angular/core';
import { Propertytrade } from '../interfaces/propertytrade.interface';
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
export class PropertytradeService extends CrudService<Propertytrade> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertytrade',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
