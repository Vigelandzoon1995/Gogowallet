import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BankInfoPage } from '../../pages/bank-info/bank-info';
import { GogowalletPage } from '../../pages/gogowallet/gogowallet';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  goToBankInfo(){
    this.navCtrl.push(BankInfoPage);
  }
  goToGoGoWallet(){
    this.navCtrl.push(GogowalletPage);
  }

}
