export default class Transaction {
    id: number = null;
    user_id: number = null;
    name: string = null;
    amount: number = null;
    date: Date = null;

    constructor(id?: number, user_id?: number, name?: string, amount?: number, date?: Date) {
        this.user_id = user_id;
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}
