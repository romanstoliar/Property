import { CrudDocument } from 'wacom';

export interface Propertyrecord extends CrudDocument {
	name: string;
	description: string;
	property_id: string;
}
