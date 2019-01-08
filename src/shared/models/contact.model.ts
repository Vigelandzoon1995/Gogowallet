export default class Contact {
	id: number;
	user_id: number;
	name: string;
	phone: string;
	notes: string;
	thumbnail: string;

	constructor(id?: number, user_id?: number, name?: string, phone?: string, notes?: string, thumbnail?: string) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.phone = phone;
		this.notes = notes;
		this.thumbnail = thumbnail;
	}
}
