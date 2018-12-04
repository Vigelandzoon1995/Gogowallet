import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

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
        Validators.required,
        Validators.minLength(8),
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])")
      ])
    });
  }

  signIn() {
    this.navCtrl.push(TabsPage);
  }

  navigateToRegister() {
    this.navCtrl.push(SignupPage);
  }
}
