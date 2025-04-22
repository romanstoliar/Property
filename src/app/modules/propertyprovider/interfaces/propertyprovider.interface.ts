import { CrudDocument } from 'wacom';

export interface Propertyprovider extends CrudDocument {
	name: string;
	description: string;
}
