import Budget from "../../shared/models/budget.model";

export class BudgetsService2 {
    private budgetsList: any[];
    list: any = [];

    addBudget(budget) {
        this.budgetsList.push(budget);
        //Todo add function from services
    }

    deleteBudget(budget) {
        var index = this.budgetsList.indexOf(budget);
        if (index != -1) {
            //Todo add delete from services
            return this.budgetsList.splice(index, 1);
        }
        else {
            return false;
        }
    }

    getAll() {
        this.budgetsList = this.mockupData();
        return this.budgetsList;
    }

    mockupData() {
        this.list = [
            ({
                category: "Outgoing",
                start_date: new Date(2018, 12, 24, 20, 0),
                end_date: new Date(2018, 12, 25, 3, 0),
                amount: 200,
                alarm: true,
                limit_lock: true,
                last_checked_date: null
            }),
            ({
                category: "Groceries",
                start_date: new Date(2018, 11, 30, 12, 0),
                end_date: new Date(2018, 12, 28, 12, 0),
                amount: 10,
                alarm: true,
                limit_lock: false,
                last_checked_date: null
            }),
            ({
                category: "Groceries",
                start_date: new Date(2018, 12, 28, 18, 0),
                end_date: new Date(2019, 1, 25, 18, 0),
                amount: 130,
                alarm: true,
                limit_lock: true,
                last_checked_date: null
            })
        ];
        return this.list;
    }
}
