import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events, private localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      try {
        if (popoverData.item.match("SIGNOUT")) {
          this.signout();
        }
        else if (popoverData.item.match("SETTINGS")) {
          this.goToSettingsPage()
        }
      } catch (Nullpointerexception) {
        //console.log(Nullpointerexception);
      }

    })
  }

  signout() {
    this.events.publish('user:signout');
  }

  goToSettingsPage() {
    this.events.publish('navTo:settings');
  }

  navigateToBudgets() {
    this.events.publish('navTo:budgets');
  }

  navigateToContacts() {
    this.events.publish('navTo:contacts');
  }
  notify() {
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null
    });
  }

}
