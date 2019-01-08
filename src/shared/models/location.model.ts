import Coordinate from "./coordinate";

export default class Location {
	id: number;
	user_id: number;
	device_id: number;
	timestamp: Date;
	coordinates: Coordinate;

	constructor(id?: number, user_id?: number, device_id?: number, timestamp?: Date, coordinate?: Coordinate) {
		this.user_id = user_id;
		this.id = id;
		this.device_id = device_id;
		this.timestamp = timestamp;
		this.coordinates = coordinate;
	}
}
