import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { AlertController, Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import User from '../../shared/models/user.model';
import { BudgetService } from '../../shared/services/budget.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { UserService } from '../../shared/services/user.service';
import Transaction from '../../shared/models/transaction.model';

@IonicPage()
@Component({
	selector: 'page-overview',
	templateUrl: 'overview.html',
})
export class OverviewPage {
	@ViewChild('pieCanvas') pieCanvas;

	currentUser: User = null;
	pieChart: any;
	budgetTotal: number;
	spendingsTotal: number;
	transactions: Transaction[] = [];
	askPin: boolean = false;

	constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
		private storage: Storage, private alertCtrl: AlertController, private authService: AuthenticationService, private userService: UserService,
		private budgetService: BudgetService, private transactionService: TransactionService) {
	}

	ionViewDidEnter() {
		this.getCurrentUser();
	}

	ionViewDidLoad() {
		this.createChart();
		if (this.askPin) {
			this.askForPin();
		}
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				this.getTotalBudget();

				// Check if user has pin already set, else ask to provide one
				if (this.currentUser.pin_code == null) {
					this.askPin = true;
				}
			}
		);
	}

	askForPin() {
		const alert = this.alertCtrl.create({
			title: 'Authentication',
			message: "Enter a PIN with a minimum of 4 and maximum of 10 numbers.",
			cssClass: 'prompt-alert',
			inputs: [
				{
					name: 'pin',
					placeholder: '',
					type: 'tel',
					label: 'PIN',
					id: 'pin'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: data => {
					}
				},
				{
					text: 'Save',
					handler: data => {
						if (data) {
							this.currentUser.pin_code = data.pin;
							this.updateUser();
						}
					}
				}
			]
		});
		alert.present();
	}

	updateUser() {
		let user = this.currentUser;
		user.password = null;

		this.userService.update(user).subscribe(
			(response) => {
				this.authService.saveUser(this.currentUser, false);
				const alert = this.alertCtrl.create({
					title: 'Authentication',
					subTitle: 'PIN has been set!',
					buttons: ['OK']
				});
				alert.present();
			},
			(error) => {
				const alert = this.alertCtrl.create({
					title: 'Authentication',
					subTitle: 'Could not set PIN, please try again!',
					buttons: ['OK']
				});
				alert.present();
				Observable.throw(error);
			}
		);
	}

	signout() {
		this.events.publish('user:signout');
	}

	navigateToBudgets() {
		this.events.publish('navTo:budgets');
	}

	getTotalBudget() {
		this.budgetService.getAll(this.currentUser.user_id).subscribe(
			(response) => {
				response.map(item => this.budgetTotal += item.amount);
				this.getTotalSpendings();
			}
		);
	}

	getTotalSpendings() {
		this.transactionService.getAll(this.currentUser.bank_account).subscribe(
			(response) => {
				this.transactions = response.sort(function (a, b) { return a.date.getTime() - b.date.getTime(); }).slice(0, 10);
				response.map(item => this.spendingsTotal += item.amount);
			}
		);
	}

	createChart() {
		this.pieChart = new Chart(this.pieCanvas.nativeElement, {
			type: 'pie',
			data: {
				labels: ['Spendings', 'Total Budget'],
				datasets: [{
					data: [this.spendingsTotal, this.budgetTotal],
					backgroundColor: [
						'#0083ff',
						'#ffbf00',
					],
					hoverBackgroundColor: [
						'#006fd8',
						'#eaaf00'
					]
				}]
			}
		});
	}
}
