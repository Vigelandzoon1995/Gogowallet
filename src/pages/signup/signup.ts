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

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService, public alertCtrl: AlertController) {
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

  submit() {
    this.user.profile_picture = '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';
    this.userService.create(this.user).subscribe(
      (response) => {
        //Show success message
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
        //Show error message
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
