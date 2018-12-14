import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  shouldHide:boolean;
  budget: { category: string , startdate:string, enddate: string, starttime:string, endtime: string, amount: string, alarm: boolean, limitlock:boolean};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

  save(){
    //Todo save budget
  }
  
  public event = {
    monthStart: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '07:43',
    monthEnds: '1990-02-20'
  }

}
