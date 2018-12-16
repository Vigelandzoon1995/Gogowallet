import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';
import { EditBudgetPage } from '../edit-budget/edit-budget';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';
import { Budget } from '../../interfaces/budget/budget.interface';
import { BudgetsService2 } from '../../services/budgets/budgets';
@IonicPage()
@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {

  data:any
  budgetCollection: {budgets: Budget[]}[];
  constructor(private budgetsService2: BudgetsService2, public popoverCtrl: PopoverController, public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {

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
      title: 'Delete '+item.category,
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
            this.budgetsService2.deleteBudget(item);
          }
        }
      ]
    });
    confirm.present();
  }

  getBudgetList(){
    //Todo add GetAll() from services
   this.budgetCollection = this.budgetsService2.getAll();
  }

}
