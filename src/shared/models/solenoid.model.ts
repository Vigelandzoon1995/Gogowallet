export default class Solenoid {
	device_id: number;
	status: number;
	pin: number;

	constructor(device_id?: number, status?: number, pin?: number) {
		this.device_id = device_id;
		this.status = status;
		this.pin = pin;
	}
}
