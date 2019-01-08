export default class Budget {
	id: number;
	category: string;
	start_date: Date;
	end_date: Date;
	amount: number;
	current_amount: number;
	alarm: boolean;
	limit_lock: boolean;
	last_checked: Date;

	constructor(id?: number, category?: string, start_date?: Date, end_date?: Date, amount?: number, alarm?: boolean,
		limit_lock?: boolean, last_checked?: Date) {
		this.id = id;
		this.category = category;
		this.start_date = start_date;
		this.end_date = end_date;
		this.amount = amount == null ? 0 : amount;
		this.alarm = alarm == null ? false : alarm;
		this.limit_lock = limit_lock == null ? false : limit_lock;
		this.last_checked = last_checked;
	}
}
