import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  loginForm: FormGroup;
  emailInput: string;
  passwordInput: string;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  signIn() {
    this.navCtrl.push(TabsPage);
  }

  navigateToRegister() {
    this.navCtrl.push(SignupPage);
  }

  navigateToReset() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
