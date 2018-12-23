import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';
import { BudgetsService2 } from '../../services/budgets/budgets';
import Budget from '../../shared/models/budget.model';
import Transaction from '../../shared/models/transaction.model';
import User from '../../shared/models/user.model';
import { AddBudgetPage } from '../add-budget/add-budget';
import { EditBudgetPage } from '../edit-budget/edit-budget';

@IonicPage()
@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {
  currentUser: User = null;
  budgets: Budget[];
  today = new Date();

  constructor(private budgetsService2: BudgetsService2, public popoverCtrl: PopoverController, public navCtrl: NavController,
    public alertCtrl: AlertController, public navParams: NavParams, private storage: Storage) {
    this.getBudgetList();
    this.getUser();
  }

  ionViewDidLoad() {
  }

  getUser() {
    this.storage.get('currentUser').then(
      (response) => {
        this.currentUser = response;
        this.checkBudgetBalance();
      }
    );
  }

  presentPopover(myEvent, item) {
    let popover = this.popoverCtrl.create(BudgetItemPopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      try {
        if (popoverData.item.match("Edit")) {
          this.openBudget(item);
        }
        else if (popoverData.item.match("Delete")) {
          this.delete(item);
        }
      } catch (Nullpointerexception) {
      }

    })
  }

  navToBudget() {
    this.navCtrl.push(AddBudgetPage);
  }

  openBudget(item) {
    this.navCtrl.push(EditBudgetPage, {
      data: item
    });
  }

  delete(item) {
    const confirm = this.alertCtrl.create({
      title: 'Delete ' + item.category,
      message: 'Are you sure you want to delete this profile?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // do nothing
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.budgetsService2.deleteBudget(item);
          }
        }
      ]
    });
    confirm.present();
  }

  getBudgetList() {
    //Todo add GetAll() from services
    this.budgets = this.budgetsService2.getAll();
  }

  checkBudgetBalance() {
    let groceriesWhiteList: String[] = ['Albert Heijn', 'Spar', 'Bakker', 'McDonalds', 'Burger King'];
    let transactions: Transaction[] = [
      new Transaction(1, this.currentUser.user_id, 'Albert Heijn', 29.99, new Date('2018-12-24 15:55')),
      new Transaction(2, this.currentUser.user_id, 'Bakker Bart', 8.50, new Date('2018-12-24 14:24')),
      new Transaction(3, this.currentUser.user_id, 'McDonalds Beurs', 6.99, new Date('2018-12-24 16:12'))
    ];

    // Set budget
    transactions.forEach((value) => {
      if (groceriesWhiteList.some(element => value.name.includes(element.toString()))) {
        // Subtract amount of transaction from groceries budget that is active
        let groceries = this.budgets.filter(f => f.category == 'Groceries' && (this.today.getTime() >= f.start_date.getTime() && this.today.getTime() <= f.end_date.getTime()))[0];
        groceries.amount = groceries.amount - value.amount;
      }
    });
  }
}
