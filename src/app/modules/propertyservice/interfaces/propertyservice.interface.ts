import { CrudDocument } from 'wacom';

export interface Propertyservice extends CrudDocument {
	name: string;
	description: string;
	provider: string;
}
