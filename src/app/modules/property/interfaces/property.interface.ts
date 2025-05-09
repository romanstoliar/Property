import { CrudDocument } from 'wacom';

export interface Property extends CrudDocument {
	name: string;
	description: string;
	address: string;
	region: String;
	city: String;
	type: string; // Визначаємо допустимі значення типу
	area: number;
	price: number;
	status: 'active' | 'rent' | 'sale' | 'archived';
	thumb: string;
	rooms: string;
	floor: string;
	renovation: string;
	appliances: string;
	utilities: string;
	nearby: string;

	buildingtype: 'new building' | 'old stock';
}
