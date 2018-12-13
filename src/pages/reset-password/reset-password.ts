import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  resetForm: FormGroup;
  email: string;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.resetForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  reset() {
    const alert = this.alertCtrl.create({
      title: 'Password Reset',
      subTitle: 'Please check your e-mail for instructions on how to reset your password.',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.push(SigninPage);
          }
        }
      ]
    });
    alert.present();
  }
}
