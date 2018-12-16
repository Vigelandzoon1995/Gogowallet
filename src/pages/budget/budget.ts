import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { min } from 'rxjs/operators';
import { Budget } from '../../interfaces/budget/budget.interface';
import { BudgetsService2 } from '../../services/budgets/budgets';

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {

  budget: Budget;
  constructor(private budgetsService2: BudgetsService2, public navCtrl: NavController, public navParams: NavParams) {
    this.setBudgetDefault();
  
  }

  ionViewDidLoad() {
  }

  save(){
    //Todo remove budgetsService2 when backend integrated
    this.budgetsService2.addBudget(this.budget);
    this.navCtrl.pop();
  }

  setBudgetDefault(){
      this.budget = {
      id: null,
      category : "",
      start_date : this.getCurrentDate(),
      start_time : this.getCurrentTime(),
      end_date : this.getCurrentDate(),
      end_time : this.getCurrentTime(),
      amount : 0,
      alarm : false,
      limit_lock : false,
      last_checked_date : null
      }
  }
  getCurrentDate(){
    var dateObj = new Date();
    var formatteddate;
    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var day = dateObj.getUTCDate().toString();
    if(day.length == 1 || month.length == 1){
      if(day.length == 1){ day = "0"+day; }
      else if(month.length == 1){month = "0"+month;}
      else if(day.length == 1 && month.length == 1){day = "0"+day; month = "0"+month;}
    } 
    formatteddate = year+"-"+month+"-"+ day; 
    return formatteddate;
  }
  getCurrentTime(){
    var dateObj = new Date();
    var formattedtime;
    var hours = dateObj.getHours().toString();
    var minutes = dateObj.getMinutes().toString();
    if(minutes.length == 1 || hours.length == 1){
      if(minutes.length == 1){ minutes = "0"+minutes; }
      else if(hours.length == 1){hours = "0"+hours;}
      else if(minutes.length == 1 && hours.length == 1){minutes = "0"+minutes; hours = "0"+hours;}
    } 
    formattedtime = hours+":"+minutes; 
    return formattedtime;
  }
  


}
