import Budget from "../../shared/models/budget.model";

export class BudgetsService2 {
	budgets: Budget[];

	addBudget(budget) {
		this.budgets.push(budget);
		//Todo add function from services
	}

	deleteBudget(budget) {
		var index = this.budgets.indexOf(budget);
		if (index != -1) {
			//Todo add delete from services
			return this.budgets.splice(index, 1);
		}
		else {
			return false;
		}
	}

	getAll() {
		this.mockupData();
		return this.budgets.sort(function (a, b) { return a.start_date.getTime() - b.start_date.getTime() });
	}

	mockupData() {
		this.budgets = [
			new Budget(1, 'Leisure', new Date('2019-01-01 00:00'), new Date('2019-02-01 03:00'), 150, true, true, null),
			new Budget(2, 'Groceries', new Date('2019-01-01 12:00'), new Date('2019-02-01 12:00'), 300, true, false, null),
		];
	}
}
