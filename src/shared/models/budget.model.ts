export default class Budget {
	id: number = null;
	category: string = null;
	start_date: Date = null;
	end_date: Date = null;
	amount: number = 0;
	current_amount: number = null;
	alarm: boolean = false;
	limit_lock: boolean = false;
	last_checked: Date = null;

	constructor(id?: number, category?: string, start_date?: Date, end_date?: Date, amount?: number, alarm?: boolean,
		limit_lock?: boolean, last_checked?: Date) {
		this.id = id;
		this.category = category;
		this.start_date = start_date;
		this.end_date = end_date;
		this.amount = amount;
		this.alarm = alarm;
		this.limit_lock = limit_lock;
		this.last_checked = last_checked;
	}
}
