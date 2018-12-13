import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { AuthService } from '../../shared/authentication/auth.service';
import { AlarmPage } from '../alarm/alarm';
import { BankInfoPage } from '../bank-info/bank-info';
import { BudgetsPage } from '../budgets/budgets';
import { EmergencyContactsPage } from '../emergency-contacts/emergency-contacts';
import { GogowalletPage } from '../gogowallet/gogowallet';
import { NotificationPage } from '../notification/notification';
import { OverviewPage } from '../overview/overview';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { TrackPage } from '../track/track';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = OverviewPage;
  tab2Root = TrackPage;
  tab3Root = AlarmPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;

  constructor(private navCtrl: NavController, public events: Events, private authService: AuthService) {
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.events.subscribe('user:signout', () => {
      //this.authService.logout();
      this.navCtrl.popToRoot();
    });
    this.events.subscribe('navTo:settings', () => {
      this.navCtrl.push(SettingsPage);
    });
    this.events.subscribe('navTo:bankinfo', () => {
      this.navCtrl.push(BankInfoPage);
    });
    this.events.subscribe('navTo:gogowallet', () => {
      this.navCtrl.push(GogowalletPage);
    });
    this.events.subscribe('navTo:budgets', () => {
      this.navCtrl.push(BudgetsPage);
    });
    this.events.subscribe('navTo:contacts', () => {
      this.navCtrl.push(EmergencyContactsPage);
    });
  }
}
