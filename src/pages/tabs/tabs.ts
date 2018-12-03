import { Component } from '@angular/core';

import { OverviewPage } from '../overview/overview';
import { TrackPage } from '../track/track';
import { AlarmPage } from '../alarm/alarm';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { PopoverController, NavController } from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover'
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OverviewPage;
  tab2Root = TrackPage;
  tab3Root = AlarmPage;
  tab4Root = NotificationPage;
  tab5Root = ProfilePage;


  title: string;

  constructor(public popoverCtrl: PopoverController,private navCtrl: NavController ) {
    // this.tabsPages= [];

    // this.tabsPage = {
    //   TabsRootPage:"tab1Root",
    //   Name: "Overview",
    //   Icon:"home" 
    // }
    // this.tabsPages.push(this.tabsPage);

    // this.tabsPage = {
    //   TabsRootPage:"tab2Root",
    //   Name: "Track",
    //   Icon:"locate" 
    // }
    // this.tabsPages.push(this.tabsPage);

    // this.tabsPage = {
    //   TabsRootPage:"tab3Root",
    //   Name: "Alarm",
    //   Icon:"alarm" 
    // }
    // this.tabsPages.push(this.tabsPage);

    // this.tabsPage = {
    //   TabsRootPage:"tab4Root",
    //   Name: "Notification",
    //   Icon:"notifications" 
    // }
    // this.tabsPages.push(this.tabsPage);
    // this.tabsPage = {
    //   TabsRootPage:"tab5Root",
    //   Name: "Profile",
    //   Icon:"contact" 
    // }
    // this.tabsPages.push(this.tabsPage);
   
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss( popoverData => {
      try {
        if(popoverData.item.match("SIGNOUT")){
          this.signout();
         }
         else if(popoverData.item.match("SETTINGS")){
          this.goToSettingsPage()
         }
      } catch (Nullpointerexception) {
        //console.log(Nullpointerexception);
      }

    })
  }
  signout(){
    this.navCtrl.popToRoot();
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }
  setTitle(tabpage){
    this.title =  tabpage;
    console.log(tabpage);
  }
  
}
