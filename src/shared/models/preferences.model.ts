export default class Preferences {
	user_id: number;
	lock_protection: boolean;
	distance_alarm: boolean;
	max_distance: number;

	constructor(user_id?: number, lock_protection?: boolean, distance_alarm?: boolean, max_distance?: number) {
		this.user_id = user_id;
		this.lock_protection = lock_protection;
		this.distance_alarm = distance_alarm;
		this.max_distance = max_distance;
	}
}
