import { CrudDocument } from 'wacom';

export interface Propertyrecord extends Omit<CrudDocument, '__created'> {
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

	property_id: string;
	cost: number;
	data?: {
		type?: string;
	};
	createdAt: string | Date; // ✅ Додай це
}
