import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';
import { BudgetHelper } from '../../shared/helpers/budget.helper';
import Budget from '../../shared/models/budget.model';
import User from '../../shared/models/user.model';
import { BudgetService } from '../../shared/services/budget.service';
import { AddBudgetPage } from '../add-budget/add-budget';
import { EditBudgetPage } from '../edit-budget/edit-budget';

@IonicPage()
@Component({
	selector: 'page-budgets',
	templateUrl: 'budgets.html',
})
export class BudgetsPage {
	today = new Date();
	currentUser: User = null;

	activeBudgets: Budget[] = [];
	finishedBudgets: Budget[] = [];

	showActive: boolean = false;
	showFinished: boolean = false;

	constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
		private budgetHelper: BudgetHelper, private budgetService: BudgetService, private storage: Storage) { }

	ionViewDidLoad() {
		this.getUser();
	}

	getUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				if (this.currentUser.bank_account) {
					this.checkBalance();
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

	async checkBalance() {
		await this.budgetHelper.checkBalance(this.currentUser.user_id, this.currentUser.bank_account, true).then((response) => {
			this.activeBudgets = response;
			this.showActive = true;
		});

		await this.budgetHelper.checkBalance(this.currentUser.user_id, this.currentUser.bank_account, false).then((response) => {
			this.finishedBudgets = response;
			this.showFinished = true;
		});
	}

	deleteBudget(budget: Budget) {
		this.budgetService.delete(budget.id).subscribe(
			(response) => this.checkBalance(),
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
}
