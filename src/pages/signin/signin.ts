import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin(){
    //Api controller via AuthServices
    this.navCtrl.push(TabsPage);
  }
  
  navigateToRegister(){
    this.navCtrl.push(SignupPage);
  }
}
