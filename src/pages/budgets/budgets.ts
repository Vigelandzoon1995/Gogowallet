import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';
import { environment as ENV } from '../../environments/environment';
import Budget from '../../shared/models/budget.model';
import Transaction from '../../shared/models/transaction.model';
import User from '../../shared/models/user.model';
import { BudgetService } from '../../shared/services/budget.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { AddBudgetPage } from '../add-budget/add-budget';
import { EditBudgetPage } from '../edit-budget/edit-budget';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-budgets',
	templateUrl: 'budgets.html',
})
export class BudgetsPage {
	currentUser: User = null;
	budgets: Budget[] = [];
	transactions: Transaction[] = [];
	today = new Date();

	constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
		private transactionService: TransactionService, private budgetService: BudgetService, private storage: Storage) { }

	ionViewCanEnter() {
		this.getUser();
	}

	getUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				if (this.currentUser.bank_account) {
					this.getBudgetList();
				}
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
			} catch (Nullpointerexception) { }
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
			title: 'Deleting ' + item.category,
			message: 'Are you sure you want to delete this budget?',
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Yes',
					handler: () => {
						this.deleteBudget(item);
					}
				}
			]
		});
		confirm.present();
	}

	getBudgetList() {
		this.budgetService.getAll(this.currentUser.user_id).subscribe(
			(response) => {
				this.budgets = response;
				this.checkBudgetBalance();
			},
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while retrieving budgets. Please try again!',
					buttons: [
						{
							text: 'OK',
						}
					]
				});
				alert.present();
			}
		);
	}

	deleteBudget(budget: Budget) {
		this.budgetService.delete(budget.id).subscribe(
			(response) => { },
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while deleting. Please try again!',
					buttons: [
						{
							text: 'OK',
						}
					]
				});
				alert.present();
			}
		);
	}

	checkBudgetBalance() {
		let groceriesWhiteList: String[] = ENV.groceriesWhiteList;
		let leisureWhiteList: String[] = ENV.leisureWhiteList;

		this.budgets.forEach(budget => {
			this.transactionService.getBetweenDates(moment(budget.start_date).format(), moment(budget.end_date).format(), this.currentUser.bank_account).subscribe(
				(response) => {
					response.forEach(transaction => {
						if (groceriesWhiteList.some((v: string) => { return transaction.name.indexOf(v) >= 0; })) {
							if (budget.category == 'Groceries') {
								if (budget.current_amount == null) {
									budget.current_amount = budget.amount;
								}
								budget.current_amount = budget.current_amount - transaction.amount;
							}
						}
						if (leisureWhiteList.some((v: string) => { return transaction.name.indexOf(v) >= 0; })) {
							console.log('Leisure');
							if (budget.category == 'Leisure') {
								if (budget.current_amount == null) {
									budget.current_amount = budget.amount;
								}
								budget.current_amount = budget.current_amount - transaction.amount;
							}
						}
					});
				}
			);
		});
	}
}
