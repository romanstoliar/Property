import { CrudDocument } from 'wacom';

export interface Property extends CrudDocument {
	name: string;
	description: string;
	address: string;
	type: string; // Визначаємо допустимі значення типу
	area: number;
	price: number;
	thumb: string;
}
