import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import User from '../../shared/models/user.model';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    private localNotifications: LocalNotifications, private storage: Storage) {
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
        if (popoverData.item.match("Sign Out")) {
          this.signout();
        }
        else if (popoverData.item.match("Settings")) {
          this.goToSettingsPage()
        }
      } catch (Nullpointerexception) {
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
