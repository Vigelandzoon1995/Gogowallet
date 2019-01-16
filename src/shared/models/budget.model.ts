export default class Budget {
	id: number;
	category: string;
	start_date: string;
	end_date: string;
	amount: number;
	current_amount: number;
	alarm: boolean;
	limit_lock: boolean;

	constructor(id?: number, category?: string, start_date?: string, end_date?: string, amount?: number, alarm?: boolean,
		limit_lock?: boolean) {
		this.id = id;
		this.category = category;
		this.start_date = start_date;
		this.end_date = end_date;
		this.amount = amount;
		this.alarm = alarm == null ? false : alarm;
		this.limit_lock = limit_lock == null ? false : limit_lock;
	}
}
