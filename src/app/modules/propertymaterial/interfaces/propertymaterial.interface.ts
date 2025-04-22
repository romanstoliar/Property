import { CrudDocument } from 'wacom';

export interface Propertymaterial extends CrudDocument {
	name: string;
	description: string;
}
