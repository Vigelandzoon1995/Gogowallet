import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
import Budget from '../models/budget.model';
import Transaction from '../models/transaction.model';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../services/transaction.service';

@Injectable()
export class BudgetHelper {
	today: Date = new Date();
	minDate: string;
	maxDate: string;

	budgets: Budget[];
	transactions: Transaction[];

	constructor(private budgetService: BudgetService, private transactionService: TransactionService) { }

	getActiveBudgets(user: number, bank_account: string) {
		this.budgetService.getActive(user).subscribe(
			(response) => {
				this.budgets = response;
				this.getDates(bank_account);
			},
			(error) => { Observable.throw(error); }
		);
	}

	getTransactions(bank_account: string) {
		this.transactionService.getBetweenDates(this.minDate, this.maxDate, bank_account).subscribe(
			(response) => {
				this.transactions = response;
				this.checkAmount();
			},
			(error) => { Observable.throw(error); }
		);
	}

	getDates(bank_account: string) {
		let sorted = this.budgets.sort((a, b) => { return new Date(a.start_date).getTime() - new Date(b.start_date).getTime(); });
		this.minDate = sorted[0].start_date;
		this.maxDate = sorted[sorted.length - 1].end_date;

		this.getTransactions(bank_account);
	}

	checkAmount() {
		let groceriesWhiteList: String[] = ENV.groceriesWhiteList;
		let leisureWhiteList: String[] = ENV.leisureWhiteList;

		// Check for each budget what currently is spent
		this.budgets.forEach(budget => {
			this.transactions.forEach(transaction => {
				if (groceriesWhiteList.some((name: string) => { return transaction.name.indexOf(name) >= 0; })) {
					if (budget.category == 'Groceries') {
						if (budget.current_amount == null) {
							budget.current_amount = budget.amount;
						}
						budget.current_amount = budget.current_amount - transaction.amount;
					}
				}
				if (leisureWhiteList.some((name: string) => { return transaction.name.indexOf(name) >= 0; })) {
					if (budget.category == 'Leisure') {
						if (budget.current_amount == null) {
							budget.current_amount = budget.amount;
						}
						budget.current_amount = budget.current_amount - transaction.amount;
					}
				}
			});
		});
	}

	async checkBalance(user: number, bank_account: string): Promise<Budget[]> {
		await this.getActiveBudgets(user, bank_account);
		return this.budgets;
	}
}
