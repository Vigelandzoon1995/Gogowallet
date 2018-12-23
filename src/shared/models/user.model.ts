export default class User {
    user_id: number = null;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    password: string = null;
    pin_code: string = null;
    budget: number = null;
    bank_account: string = null;
    profile_picture: string = null;

    constructor(user_id?: number, first_name?: string, last_name?: string, email?: string, password?: string, pin_code?: string,
        budget?: number, bank_account?: string, profile_picture?: string) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.pin_code = pin_code;
        this.budget = budget;
        this.bank_account = bank_account;
        this.profile_picture = profile_picture;
    }
}
