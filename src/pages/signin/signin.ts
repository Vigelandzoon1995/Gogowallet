import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  loginForm: FormGroup;
  emailInput: string;
  passwordInput: string;

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
