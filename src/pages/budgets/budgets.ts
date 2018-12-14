import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';

/**
 * Generated class for the BudgetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {

  data:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetsPage');
    this.createList();
  }
  navToBudget(){
    this.navCtrl.push(BudgetPage);
  }
  openBudget(item){
    //Todo create new EditBugetPage
    // this.navCtrl.push(BudgetPage,{
    //   data: item
    // });
  }

  delete(item){
    //Todo add delete function
  }

  createList(){
    this.data = [
      {
        category:"Outgoing",
        startdate:"1993-02-19",
        enddate:"1994-02-19",
        starttime:"07:43",
        endtime: "07:43",
        amount:"200",
        alarm: true,
        limitlock:true
      },
      {
        category:"Groceries",
        startdate:"1990-02-19",
        enddate:"1990-02-19",
        starttime:"07:43",
        endtime: "07:43",
        amount:"10",
        alarm: true,
        limitlock:true
      },
      {
        category:"Groceries",
        startdate:"1990-02-19",
        enddate:"1990-02-19",
        starttime:"07:43",
        endtime: "07:43",
        amount:"130",
        alarm: true,
        limitlock:true
      },
    ]
  }

}
