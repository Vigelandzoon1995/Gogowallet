export default class Budget {
    id: number = null;
    category: string = null;
    start_date: Date = null;
    end_date: Date = null;
    amount: number = 0;
    alarm: boolean = false;
    limit_lock: boolean = false;
    last_checked: Date = null;
}
