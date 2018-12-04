import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  goToBankInfo(){
    this.events.publish('navTo:bankinfo');
  }
  goToGoGoWallet(){
    this.events.publish('navTo:gogowallet');
  }

}
