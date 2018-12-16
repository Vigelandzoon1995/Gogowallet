export interface Budget {
    id: number;
    category: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    amount: number;
    alarm: boolean;
    limit_lock: boolean;
    last_checked_date: string;
}