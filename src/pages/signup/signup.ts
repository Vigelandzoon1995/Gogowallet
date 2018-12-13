import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  registerForm: FormGroup;
  user: User = new User();
  password_confirm: string;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService,
    public alertCtrl: AlertController) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ])
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
  }

  register() {
    this.userService.create(this.user).subscribe(
      (response) => {
        //Show message
        const alert = this.alertCtrl.create({
          title: 'Successfully Registered',
          subTitle: 'You have successfully been registered.',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                //Redirect to login page
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      },
      (error) => {
        //Show message
        const alert = this.alertCtrl.create({
          title: 'Failed to Register',
          subTitle: 'An error occured while registering. Please try again.',
          buttons: [
            {
              text: 'OK',
              handler: data => {
              }
            }
          ]
        });
        alert.present();
      }
    );
  }
}
