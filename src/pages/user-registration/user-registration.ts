import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html',
})
export class UserRegistrationPage {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmation_password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }

  showAlert() {
    console.log('first_name '+this.first_name);
    console.log('last_name '+this.last_name);
    console.log('email '+this.email);
    console.log('password '+this.password);
    console.log('confirmation_password '+this.confirmation_password);

  }

}
