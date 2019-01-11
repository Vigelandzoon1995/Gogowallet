export default class Location {
	id: number;
	device_id: number;
	time: string;
	latitude: string;
	longitude: string;

	constructor(id?: number, device_id?: number, time?: string, latitude?: string, longitude?: string) {
		this.id = id;
		this.device_id = device_id;
		this.time = time;
		this.latitude = latitude;
		this.longitude = longitude;
	}
}
