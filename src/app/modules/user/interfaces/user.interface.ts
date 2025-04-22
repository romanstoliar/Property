import { CrudDocument } from "wacom";

export interface User extends CrudDocument {
	data: Record<string, unknown>;
	is: Record<string, boolean>;
	name: string;
	phone: string;
	bio: string;
	email: string;
	thumb: string;
}
