import { CrudDocument } from 'wacom';

export interface Propertytrade extends CrudDocument {
	name: string;
	description: string;
	property: string;
}
