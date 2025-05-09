import { CrudDocument } from 'wacom';

export interface Propertyworker extends CrudDocument {
	name: string;
	position: string;
	experience: number;
	task: string;
	status: string;
	region: string;
	city: string;
}
