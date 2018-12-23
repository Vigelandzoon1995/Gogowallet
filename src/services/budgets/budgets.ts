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
            new Budget(1, 'Entertainment', new Date('2018-12-24 20:00'), new Date('2018-12-25 03:00'), 60, true, true, null),
            new Budget(2, 'Groceries', new Date('2018-11-30 12:00'), new Date('2018-12-28 12:00'), 150, true, false, null),
            new Budget(3, 'Groceries', new Date('2018-12-28 18:00'), new Date('2019-01-25 18:00'), 130, true, true, null)
        ];
    }
}
