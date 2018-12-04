import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {

  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewPage');
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
    console.log("signout");
    this.events.publish('user:signout');
  }

  goToSettingsPage(){
   this.events.publish('navTo:settings');
  }

  navToBudgetsPage(){
    this.events.publish('navTo:budgets');
   }

}
