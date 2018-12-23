import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import User from '../../shared/models/user.model';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  currentUser: User = null;
  loginForm: FormGroup;
  emailInput: string;
  passwordInput: string;
  pinCodeInput: string;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, public alertCtrl: AlertController, private authService: AuthenticationService,
    private storage: Storage) {
    this.createFormGroup();
    this.checkLocalUser();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
    });
  }

  signIn() {
    this.navCtrl.push(TabsPage);
    //this.authService.signIn(this.emailInput, this.passwordInput);
  }

  signInByPin() {
    this.authService.signInByPin(this.currentUser.email, this.currentUser.password, this.pinCodeInput);
  }

  checkLocalUser() {
    this.storage.get('currentUser').then(
      (result) => {
        if (result) {
          this.currentUser = result;

          // Remove email and password controls
          this.loginForm.removeControl('email');
          this.loginForm.removeControl('password');
        }
      }
    );
  }

  navigateToRegister() {
    this.navCtrl.push(SignupPage);
  }

  navigateToReset() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
