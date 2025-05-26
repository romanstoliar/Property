import { CrudDocument } from 'wacom';

export interface Propertyrecord extends CrudDocument {
	name: string;
	description: string;
	type:
		| 'sell / buy payment'
		| 'service'
		| 'utility bill'
		| 'inspection'
		| 'materials'
		| 'cleaning'
		| 'rent payment'
		| 'incident';
	cost: number;
	date?: string | Date;
	createdAt: string | Date;
	status: 'planned' | 'in progress' | 'done';
	duration?: number;
	files?: string[];
	worker_id?: string;
	property_id: string;
	thumb: string;
}
