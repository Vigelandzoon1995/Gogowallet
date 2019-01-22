import { Component, ViewChild } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BLE } from '@ionic-native/ble';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { AlertController, Events, IonicPage, NavController, NavParams, Platform, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { BLEComponent } from '../../components/bleComponent/ble';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import { BudgetHelper } from '../../shared/helpers/budget.helper';
import Preferences from '../../shared/models/preferences.model';
import Transaction from '../../shared/models/transaction.model';
import User from '../../shared/models/user.model';
import { BudgetService } from '../../shared/services/budget.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { UserService } from '../../shared/services/user.service';

@IonicPage()
@Component({
	selector: 'page-overview',
	templateUrl: 'overview.html',
	providers: [BLE, LocalNotifications, BLEComponent, BackgroundMode]
})
export class OverviewPage {
	@ViewChild('pieCanvas') pieCanvas;

	today: Date = new Date();
	currentUser: User = null;
	subscription: ISubscription;

	pieChart: any;
	budgetTotal: number = 0;
	spendingsTotal: number = 0;

	transactions: Transaction[] = [];
	preferences: Preferences;

	notification: ILocalNotification = {
		title: 'Gogowallet',
		text: '',
		vibrate: true,
		foreground: true,
		led: 'FFFFFF',
	}

	constructor(public bleComponent: BLEComponent, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams,
		private backgroundMode: BackgroundMode, private localNotifications: LocalNotifications, public events: Events, private storage: Storage,
		private alertCtrl: AlertController, private authService: AuthenticationService, private userService: UserService, private platform: Platform,
		private budgetService: BudgetService, private transactionService: TransactionService, private budgetHelper: BudgetHelper) {

		this.backgroundMode.enable();

		this.bleComponent.startBackgroundScan(this.preferences);
		this.beginBudgetMonitor();
	}

	ionViewDidLoad() {
		this.getCurrentUser();
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;

				// Check if user has pin already set, else ask to provide one
				if (this.currentUser.pin_code == null) {
					this.askForPin();
				}

				this.getTotalBudget();
			}
		);
	}

	getPreferences(user: number) {
		this.userService.getPreferences(user).subscribe(
			(response) => {
				this.preferences = response;
				this.storage.set('preferences', response);
			},
			(error) => { }
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
		this.budgetService.getSum().subscribe(
			(response) => {
				this.budgetTotal = response;
				if (!this.budgetTotal) {
					this.budgetTotal = 0;
				}

				this.getTotalSpendings();
			}
		);
	}

	getTotalSpendings() {
		this.transactionService.getSum(this.currentUser.bank_account).subscribe(
			(response) => {
				this.spendingsTotal = response;
				if (!this.spendingsTotal) {
					this.spendingsTotal = 0;
				}

				this.createChart();
			}
		);
	}

	getLastTransactions() {
		this.transactionService.getLastTen(this.currentUser.bank_account).subscribe(
			(response) => {
				this.transactions = response;
				this.getPreferences(this.currentUser.user_id);
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
			},
			options: {
				animation: {
					duration: 0,
					easing: 'linear'
				},
				tooltips: {
					callbacks: {
						title: (tooltipItem, data) => {
							return data['labels'][tooltipItem[0]['index']];
						}, label: (tooltipItem, data) => {
							return ' €' + (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]).toFixed(2);
						},
					}
				}
			}
		});

		this.getLastTransactions();
	}

	beginBudgetMonitor() {
		this.backgroundMode.on("activate").subscribe(() => {
			this.backgroundMode.disableWebViewOptimizations();

			this.subscription = Observable.interval(1000 * 60).subscribe(x => {
				let count = 0;

				this.budgetHelper.checkBalance(this.currentUser.user_id, this.currentUser.bank_account, true).then(
					(response) => {
						response.forEach(budget => { if (budget.current_amount >= budget.amount) { count++; } });
					}
				);

				if (count >= 1) {
					this.notification.text = 'One of your budgets has been exceeded.';
					this.localNotifications.schedule(this.notification);
				}
			});
		});
	}
}
