import { Component } from '@angular/core';

import { OverviewPage } from '../overview/overview';
import { TrackPage } from '../track/track';
import { AlarmPage } from '../alarm/alarm';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { Events, NavController } from 'ionic-angular';
import { BankInfoPage } from '../bank-info/bank-info';
import { GogowalletPage } from '../gogowallet/gogowallet';
import { BudgetsPage } from '../budgets/budgets';
import { EmergencyContactsPage } from '../emergency-contacts/emergency-contacts';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OverviewPage;
  tab2Root = TrackPage;
  tab3Root = AlarmPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;

  constructor(private navCtrl: NavController, public events: Events) {
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.events.subscribe('user:signout', () => {
      this.navCtrl.popToRoot();
    })
    this.events.subscribe('navTo:settings', () => {
      this.navCtrl.push(SettingsPage);
    })
    this.events.subscribe('navTo:bankinfo', () => {
      this.navCtrl.push(BankInfoPage);
    })
    this.events.subscribe('navTo:gogowallet', () => {
      this.navCtrl.push(GogowalletPage);
    })
    this.events.subscribe('navTo:budgets', () => {
      this.navCtrl.push(BudgetsPage);
    })
    this.events.subscribe('navTo:contacts', () => {
      this.navCtrl.push(EmergencyContactsPage);
    })
  }
}
