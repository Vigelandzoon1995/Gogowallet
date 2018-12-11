import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  registerForm: FormGroup;
  user: User = new User();
  password_confirm: string;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
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
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has all the requirements
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ]),
      confirm_password: new FormControl('', [
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has all the requirements
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ])
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
  }

  register() {
    if (this.user.password == this.password_confirm) {
      alert('Succes');
    } else {
      alert('Failed')
    }
  }
}
