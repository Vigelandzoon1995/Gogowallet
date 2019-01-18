import { Component, NgZone } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import Preferences from '../../shared/models/preferences.model';

@Component({
    selector: 'ble-component',
	templateUrl: 'ble-component.html',
    providers:[BLE,LocalNotifications,BackgroundMode]
})
export class BLEComponent {
    devices: any[] = [];
    device: any;
    subscription: ISubscription;
    preferences: Preferences;

	constructor(private backgroundMode: BackgroundMode, private ble: BLE, private ngZone: NgZone, private localNotifications: LocalNotifications){}
	
      startBackgroundScan() {
        this.getPreferences();
        this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(() => {
           this.subscription = Observable.interval(1000).subscribe(x=>{
                console.log(x);
                this.ble.scan([], 5).subscribe(
                    device => this.onDeviceDiscovered(device)
                );
             });
          });
      }
    
      onDeviceDiscovered(device) {
        this.ngZone.run(() => {
          this.devices.push(device);
          if(device.id == 'B8:27:EB:7E:2C:47'){
            this.backgroundMode.on("deactivate").subscribe(() => {
                this.subscription.unsubscribe();
            });
            this.calculateDistanceDevice(device.rssi);
          }
        });
      }

      disableBackgroundScan(){
        this.backgroundMode.disable();
      }
    
      calculateDistanceDevice(rssi){ 
        var distance = (10**(((-41)-(rssi))/(10*2)));
        //compare prefered distance of user
        if(distance >= this.preferences.max_distance){ 
            this.showBluetoothNotification();
        }
        else{
            //check wheter state is off and if budget is not overspended to turn solenoid state on
        }
      }
      showBluetoothNotification(){
        if(this.preferences.distance_alarm ){
            this.triggerLocalNotification();
            if(this.preferences.lock_protection){
                //change Solenoid state to 0 
            }
               
        }
        else if(!this.preferences.distance_alarm && this.preferences.lock_protection ){
             //change Solenoid state to 0
        }
   
      }

      triggerLocalNotification(){
        this.localNotifications.schedule({
            title: 'Gogowallet',
            text: 'You are leaving your wallet behind',
          //  trigger: {at: new Date(new Date().getTime() + 3600)},
            vibrate: true,
            foreground: true,
            sound: null
         });
      }
      getPreferences() {
		//this.storage.get('preferences').then((result) => this.preferences = result);
		this.preferences = new Preferences();
		this.preferences.distance_alarm = true;
		this.preferences.lock_protection = true;
		this.preferences.max_distance = 6;
	}

}
