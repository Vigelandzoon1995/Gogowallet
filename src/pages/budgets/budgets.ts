import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';
import { EditBudgetPage } from '../edit-budget/edit-budget';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';


@IonicPage()
@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {

  data:any

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetsPage');
    this.getBudgetList();
  }

  presentPopover(myEvent,item) {
    let popover = this.popoverCtrl.create(BudgetItemPopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      try {
        if (popoverData.item.match("View")) {
          this.openBudget(item);
        }
        else if (popoverData.item.match("Delete")) {
         this.delete(item);
        }
      } catch (Nullpointerexception) {
      }

    })
  }

  navToBudget(){
    this.navCtrl.push(BudgetPage);
  }
  openBudget(item){
    this.navCtrl.push(EditBudgetPage,{
      data: item
    });
  }

  delete(item){
    const confirm = this.alertCtrl.create({
      title: 'Delete budget',
      message: 'Do you agree to delete this budget?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            // do nothing
          }
        },
        {
          text: 'Agree',
          handler: () => {
            var index = this.data.indexOf(item);
            if(index != -1){
                return this.data.splice(index,1);
                //Todo add api call delete functionality
            }
            else{
              return false;
            }
          }
        }
      ]
    });
    confirm.present();
  }

  getBudgetList(){
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
