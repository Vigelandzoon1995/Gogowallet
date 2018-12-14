import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../shared/helpers/auth.guard';
import { UserService } from '../../shared/services/user.service';
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

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService, private storage: Storage,
    public alertCtrl: AlertController, private authGuard: AuthGuard) {
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
    // this.authGuard.signIn(this.emailInput, this.passwordInput).subscribe(
    //   (response) => {
    //     if (response) {
    //       if (response.token != false) {

    //         // Navigate to home
    //         this.navCtrl.push(TabsPage);

    //         // Save user locally
    //         //this.getCurrentUser();
    //       }
    //     }
    //   },
    //   (error) => {
    //     //Show error message
    //     const alert = this.alertCtrl.create({
    //       title: 'Sign In',
    //       subTitle: 'You have entered an invalid username or password.',
    //       buttons: [
    //         {
    //           text: 'OK',
    //           handler: data => {
    //             //Redirect to login page
    //             this.navCtrl.pop();
    //           }
    //         }
    //       ]
    //     });
    //     alert.present();
    //   }
    // );
  }

  getCurrentUser() {
    this.userService.getByEmail(this.emailInput).subscribe(
      (response) => {
        this.authGuard.saveUser(response);

        // Navigate to home
        this.navCtrl.push(TabsPage);
      },
      (error) => { Observable.throw(error); }
    );
  }

  navigateToRegister() {
    this.navCtrl.push(SignupPage);
  }

  navigateToReset() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
