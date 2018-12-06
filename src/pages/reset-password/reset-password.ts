import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
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
      subTitle: 'An e-mail with your temporary password has been sent!',
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
