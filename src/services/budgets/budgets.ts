import { Budget } from "../../interfaces/budget/budget.interface";

export class BudgetsService2 {
    private budgetsList: {budgets: Budget[]}[];
    list:any;
    addBudget(budget){
        this.budgetsList.push(budget);
        //Todo add function from services
    }

    deleteBudget(budget){
        var index = this.budgetsList.indexOf(budget);
        if(index != -1){
          //Todo add delete from services
          return this.budgetsList.splice(index,1);   
        }
        else{
          return false;
        }
    }

    getAll(){
        this.budgetsList = this.mockupData();
        return this.budgetsList;
    }

    mockupData(){
    this.list = [
        {
            category:"Outgoing",
            start_date:"1993-02-19",
            end_date:"1994-02-19",
            start_time:"07:43",
            end_time: "07:43",
            amount: 200,
            alarm: true,
            limit_lock:true,
            last_checked_date: ""
          },
          {
            category:"Groceries",
            start_date:"1990-02-19",
            end_date:"1990-02-19",
            start_time:"07:43",
            end_time: "07:43",
            amount: 10,
            alarm: true,
            limit_lock:false,
            last_checked_date: ""
          },
          {
            category:"Groceries",
            start_date:"1990-02-19",
            end_date:"1990-02-19",
            start_time:"07:43",
            end_time: "07:43",
            amount: 130,
            alarm: true,
            limit_lock:true,
            last_checked_date: ""
          }
        ];
        return this.list;
    }
}