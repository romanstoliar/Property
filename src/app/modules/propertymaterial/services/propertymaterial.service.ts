import { Injectable } from '@angular/core';
import { Propertymaterial } from '../interfaces/propertymaterial.interface';
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
export class PropertymaterialService extends CrudService<Propertymaterial> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'propertymaterial',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
