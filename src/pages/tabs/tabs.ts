import { Component } from '@angular/core';

import { OverviewPage } from '../overview/overview';
import { TrackPage } from '../track/track';
import { AlarmPage } from '../alarm/alarm';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { Events, NavController } from 'ionic-angular';
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
  }
}
