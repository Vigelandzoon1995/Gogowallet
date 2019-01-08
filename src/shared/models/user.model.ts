export default class User {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	pin_code: string;
	balance: number;
	bank_account: string;
	profile_picture: string;

	constructor(user_id?: number, first_name?: string, last_name?: string, email?: string, password?: string, pin_code?: string,
		balance?: number, bank_account?: string, profile_picture?: string) {
		this.user_id = user_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.pin_code = pin_code;
		this.balance = balance;
		this.bank_account = bank_account;
		this.profile_picture = profile_picture;
	}
}
