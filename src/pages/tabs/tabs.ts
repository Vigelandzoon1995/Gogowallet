import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
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
import { AuthGuard } from '../../shared/helpers/auth.guard';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = OverviewPage;
  tab2Root = TrackPage;
  tab3Root = AlarmPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;

  constructor(private navCtrl: NavController, public events: Events, private authGuard: AuthGuard) {
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.events.subscribe('user:signout', () => {
      this.authGuard.signOut();
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
    this.events.subscribe('navTo:editprofilepage', () => {
      this.navCtrl.push(EditProfilePage);
    });
  }
}
