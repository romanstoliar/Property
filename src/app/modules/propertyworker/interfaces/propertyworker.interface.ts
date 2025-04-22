import { CrudDocument } from 'wacom';

export interface Propertyworker extends CrudDocument {
	name: string;
	description: string;
	provider: string;
}
