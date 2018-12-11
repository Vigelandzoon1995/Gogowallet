import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { EmergencyContactsPage } from '../emergency-contacts/emergency-contacts';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events) {
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
    console.log("signout");
    this.events.publish('user:signout');
  }

  goToSettingsPage() {
    this.events.publish('navTo:settings');
  }

  navigateToBudgets() {
    this.events.publish('navTo:budgets');
  }

  navigateToContacts() {
    this.navCtrl.push(EmergencyContactsPage);
  }

}
