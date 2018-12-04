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
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OverviewPage;
  tab2Root = TrackPage;
  tab3Root = AlarmPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;

  constructor(private navCtrl: NavController,  public events: Events) {
    events.subscribe('user:signout', () =>{
      this.navCtrl.popToRoot();
    })
    events.subscribe('navTo:settings', () =>{
      this.navCtrl.push(SettingsPage);
    })
    events.subscribe('navTo:bankinfo', () =>{
      this.navCtrl.push(BankInfoPage);
    })
    events.subscribe('navTo:gogowallet', () =>{
      this.navCtrl.push(GogowalletPage);
    })
  }
}
