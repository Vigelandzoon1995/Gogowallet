import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { min } from 'rxjs/operators';

/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {

  budget: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setBudgetDefault();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

  save(){
    //Todo save budget
  }

  setBudgetDefault(){
    console.log(this.getCurrentTime());
    this.budget = {
      category :"",
      startdate : this.getCurrentDate(),
      starttime : this.getCurrentTime(),
      enddate : this.getCurrentDate(),
      endtime : this.getCurrentTime(),
      amount : 0,
      alarm : false,
      limitlock : false
    }
  }
  getCurrentDate(){
    var dateObj = new Date();
    var formatteddate;
    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var day = dateObj.getDay().toString();
    if(day.length == 1 || month.length == 1){
      if(day.length == 1){ day = 0+day; }
      else if(month.length == 1){month = 0+month;}
      else if(day.length == 1 && month.length == 1){day = 0+day; month = 0+month;}
    } 
    formatteddate = year+"-"+month+"-"+day; 
    return formatteddate;
  }
  getCurrentTime(){
    var dateObj = new Date();
    var formattedtime;
    var hours = dateObj.getHours().toString();
    var minutes = dateObj.getMinutes().toString();
    if(minutes.length == 1 || hours.length == 1){
      if(minutes.length == 1){ minutes = 0+minutes; }
      else if(hours.length == 1){hours = 0+hours;}
      else if(minutes.length == 1 && hours.length == 1){minutes = 0+minutes; hours = 0+hours;}
    } 
    formattedtime = hours+":"+minutes; 
    return formattedtime;
  }
  


}
