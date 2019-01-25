import { Component, NgZone } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { BudgetHelper } from '../../shared/helpers/budget.helper';
import Preferences from '../../shared/models/preferences.model';
import Solenoid from '../../shared/models/solenoid.model';
import User from '../../shared/models/user.model';
import { SolenoidService } from '../../shared/services/solenoid.service';

@Component({
	selector: 'ble-component',
	templateUrl: 'ble-component.html',
	providers: [BLE, LocalNotifications, BackgroundMode]
})
export class BLEComponent {
	user: User = null;
	devices: any[] = [];
	device: any;
	solenoid: Solenoid;
	message: string
	subscription: ISubscription;
	preferences: Preferences;

	constructor(private backgroundMode: BackgroundMode, private ble: BLE, private ngZone: NgZone, private localNotifications: LocalNotifications,
		private solenoidService: SolenoidService, private budgetHelper: BudgetHelper, private storage: Storage) {
		this.getCurrentUser();
	}


	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => this.user = response
		);
	}

	startBackgroundScan(preferences) {
		this.preferences = preferences;
		this.backgroundMode.on("activate").subscribe(() => {
			this.backgroundMode.disableWebViewOptimizations();

			this.subscription = Observable.interval(1000).subscribe(x => {
				this.getStatus(1);
				this.ble.scan([], 5).subscribe(
					device => this.onDeviceDiscovered(device)
				);
			});
		});
	}

	onDeviceDiscovered(device) {
		this.ngZone.run(() => {
			this.devices.push(device);
			if (device.id == 'B8:27:EB:7E:2C:47') {
				this.backgroundMode.on("deactivate").subscribe(() => {
					this.subscription.unsubscribe();
				});
				this.calculateDistanceDevice(device.rssi);
			}
			else if (device.id != 'B8:27:EB:7E:2C:47' && this.solenoid.status == 1) {
				this.updateStatus(0);
			}
		});
	}

	disableBackgroundScan() {
		this.backgroundMode.disable();
	}

	calculateDistanceDevice(rssi) {
		var distance = (10 ** (((-41) - (rssi)) / (10 * 2)));
		//compare prefered distance of user
		if (distance >= this.preferences.max_distance) {
			this.showBluetoothNotification();
		}
		else {
			let count = 0;

			this.budgetHelper.checkBalance(this.user.user_id, this.user.bank_account, true).then((response) => {
				response.forEach(budget => { if (budget.current_amount >= budget.amount) { count++; } });
			});

			//check wheter state is off and if budget is not overspended to turn solenoid state on
			this.getStatus(1);
			if (this.solenoid.status == 0 && count == 0 && distance <= this.preferences.max_distance) {
				this.updateStatus(1);
				// update status
			}
		}
	}

	showBluetoothNotification() {
		if (this.preferences.distance_alarm) {
			this.triggerLocalNotification();
			if (this.preferences.lock_protection) {
				this.getStatus(1);
				if (this.solenoid.status == 1) {
					this.updateStatus(0);
				}
			}

		}
		else if (!this.preferences.distance_alarm && this.preferences.lock_protection) {
			this.getStatus(1);
			if (this.solenoid.status == 1) {
				this.updateStatus(0);
			}
		}

	}

	getStatus(id: number) {
		this.solenoidService.getStatusById(id).subscribe(
			(response) => {
				this.solenoid = new Solenoid(id, 0, 0);
				this.solenoid.status = response;
			},
			(error) => { }
		);
	}

	updateStatus(status: number) {
		this.solenoid.status = status;
		this.solenoidService.updateStatus(this.solenoid).subscribe(
			(response) => {
				this.message = response;
			},
			(error) => { }
		);
	}

	triggerLocalNotification() {
		this.localNotifications.schedule({
			title: 'Gogowallet',
			text: 'You are leaving your wallet behind',
			//  trigger: {at: new Date(new Date().getTime() + 3600)},
			vibrate: true,
			foreground: true,
			sound: null
		});
	}
}
