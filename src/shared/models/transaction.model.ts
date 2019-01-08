export default class Transaction {
	id: number;
	bank_account: string;
	name: string;
	amount: number;
	date: Date;

	constructor(id?: number, bank_account?: string, name?: string, amount?: number, date?: Date) {
		this.bank_account = bank_account;
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.date = date;
	}
}
