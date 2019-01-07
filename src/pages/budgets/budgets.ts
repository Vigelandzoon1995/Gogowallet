import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { BudgetItemPopoverComponent } from '../../components/budget-item-popover/budget-item-popover';
import { BudgetsService2 } from '../../services/budgets/budgets';
import Budget from '../../shared/models/budget.model';
import Transaction from '../../shared/models/transaction.model';
import User from '../../shared/models/user.model';
import { TransactionService } from '../../shared/services/transaction.service';
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
		public alertCtrl: AlertController, public navParams: NavParams, private transactionService: TransactionService, private storage: Storage) {
		this.getBudgetList();
		this.getUser();
	}

	ionViewDidLoad() {
	}

	getUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				if (this.currentUser.bank_account) {
					this.checkBudgetBalance();
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
					text: 'No'
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
		let entertainmentWhiteList: String[] = ['Pathe', 'Bioscoop', 'Kart', 'Laser'];

		this.budgets.forEach(budget => {
			let transactions: Transaction[] = [
				new Transaction(1, 'NL01BANK123456', 'Albert Heijn', 19.99, new Date('2019-01-07 13:23')),
				new Transaction(2, 'NL01BANK123456', 'Spar', 6.77, new Date('2019-01-08 12:23')),
				new Transaction(3, 'NL01BANK123456', 'McDonalds', 7.99, new Date('2019-01-08 16:56')),
				new Transaction(4, 'NL01BANK123456', 'Bowlingcentrum Atoll', 15.00, new Date('2019-01-09 16:00')),
				new Transaction(5, 'NL01BANK123456', 'Pathe', 22.34, new Date('2019-01-09 19:24')),
			];

			// this.transactionService.getBetweenDates(budget.start_date, budget.end_date, this.currentUser.bank_account).subscribe(
			// 	(response) => transactions = response
			// );

			transactions.forEach(transaction => {
				if (groceriesWhiteList.includes(transaction.name)) {
					if (budget.category == 'Groceries') {
						if (budget.current_amount == null) {
							budget.current_amount = budget.amount;
						}
						budget.current_amount = budget.current_amount - transaction.amount;
					}
				}
				if (entertainmentWhiteList.includes(transaction.name)) {
					if (budget.category == 'Entertainment') {
						if (budget.current_amount == null) {
							budget.current_amount = budget.amount;
						}
						budget.current_amount = budget.current_amount - transaction.amount;
					}
				}
			});
		});
	}
}
