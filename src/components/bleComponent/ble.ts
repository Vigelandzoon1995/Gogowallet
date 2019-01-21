import { Component, NgZone } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import Preferences from '../../shared/models/preferences.model';
import Solenoid from '../../shared/models/solenoid.model';
import { SolenoidService } from '../../shared/services/solenoid.service';

@Component({
    selector: 'ble-component',
    templateUrl: 'ble-component.html',
    providers: [BLE, LocalNotifications, BackgroundMode]
})
export class BLEComponent {
    devices: any[] = [];
    device: any;
    solenoid: Solenoid;
    message: string
    subscription: ISubscription;
    preferences: Preferences;

    constructor(private backgroundMode: BackgroundMode, private ble: BLE, private ngZone: NgZone, private localNotifications: LocalNotifications, 
		private solenoidService: SolenoidService) { }

    startBackgroundScan(preferences) {
        this.preferences = preferences;
        this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(() => {
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
            //check wheter state is off and if budget is not overspended to turn solenoid state on
            // if(this.solenoid.status == 0  && !overspended && distance <= this.preferences.max_distance){
            //     console.log("Turning status on");
            //     this.updateStatus(1);
            //     // update status
            // }
        }
    }

    showBluetoothNotification() {
        if (this.preferences.distance_alarm) {
            this.triggerLocalNotification();
            if (this.preferences.lock_protection) {
                if(this.solenoid.status == 1){
                    console.log("Turn status off also on lock protection enabled");
                    this.updateStatus(0);
                }
            }

        }
        else if (!this.preferences.distance_alarm && this.preferences.lock_protection) {
             if(this.solenoid.status == 1){
                 this.updateStatus(0);
             }
        }

    }

    getStatus(id: number) {
		this.solenoidService.getStatusById(id).subscribe(
			(response) => {
                this.solenoid = new Solenoid(id,0,0);
				this.solenoid.status = response;
				console.log(JSON.stringify("DB Status: "+this.solenoid.status));
			},
			(error) => { }
		);
    }

    updateStatus(status: number){
        this.solenoid.status = status;
        console.log("New Status: "+this.solenoid.status)
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
