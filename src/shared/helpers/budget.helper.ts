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

	groceriesWhiteList: String[] = ENV.groceriesWhiteList;
	leisureWhiteList: String[] = ENV.leisureWhiteList;

	constructor(private budgetService: BudgetService, private transactionService: TransactionService) { }

	getActiveBudgets(user: number, bank_account: string) {
		return new Promise((resolve, reject) => {
			this.budgetService.getActive(user).subscribe(
				(response) => {
					this.budgets = response;
					resolve();
				},
				(error) => { Observable.throw(error); }
			);
		});
	}

	getTransactions(bank_account: string) {
		return new Promise((resolve, reject) => {
			this.transactionService.getBetweenDates(this.minDate, this.maxDate, bank_account).subscribe(
				(response) => {
					this.transactions = response;
					resolve();
				},
				(error) => { Observable.throw(error); }
			);
		});
	}

	getDates() {
		return new Promise((resolve, reject) => {
			let sorted = this.budgets.sort((a, b) => { return new Date(a.start_date).getTime() - new Date(b.start_date).getTime(); });
			this.minDate = sorted[0].start_date;
			this.maxDate = sorted[sorted.length - 1].end_date;

			resolve();
		});
	}

	async checkAmount(user: number, bank_account: string) {
		await this.getActiveBudgets(user, bank_account).then((result) => this.getDates().then((result) => this.getTransactions(bank_account)));

		return await new Promise<Budget[]>((resolve, reject) => {
			// Check for each budget what currently is spent
			this.budgets.forEach(budget => {
				this.transactions.forEach(transaction => {
					if (this.groceriesWhiteList.some((name: string) => { return transaction.name.indexOf(name) >= 0; })) {
						if (budget.category == 'Groceries') {
							if (budget.current_amount == null) {
								budget.current_amount = budget.amount;
							}
							budget.current_amount = budget.current_amount - transaction.amount;
						}
					}
					if (this.leisureWhiteList.some((name: string) => { return transaction.name.indexOf(name) >= 0; })) {
						if (budget.category == 'Leisure') {
							if (budget.current_amount == null) {
								budget.current_amount = budget.amount;
							}
							budget.current_amount = budget.current_amount - transaction.amount;
						}
					}
				});
			});

			resolve(this.budgets);
		});
	}

	async checkBalance(user: number, bank_account: string): Promise<Budget[]> {
		let result = null;
		await this.checkAmount(user, bank_account).then((data) => { result = data; });
		return result;
	}
}
