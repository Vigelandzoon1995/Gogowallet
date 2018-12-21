import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import User from '../../shared/models/user.model';
import { TransactionService } from '../../shared/services/transaction.service';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  currentUser: User = null;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    private localNotifications: LocalNotifications, private transactionService: TransactionService, private storage: Storage) {
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

  getCurrentUser() {
    this.storage.get('currentUser').then(
      (response) => this.currentUser = response
    );
  }

  checkBalance() {
    this.transactionService.getOfToday(this.currentUser.user_id).subscribe(
      (response) => {

      },
      (error) => { }
    );
  }
}
