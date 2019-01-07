export default class Transaction {
	id: number = null;
	bank_account: string = null;
	name: string = null;
	amount: number = null;
	date: Date = null;

	constructor(id?: number, bank_account?: string, name?: string, amount?: number, date?: Date) {
		this.bank_account = bank_account;
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.date = date;
	}
}
