import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
	selector: 'page-signin',
	templateUrl: 'signin.html',
})
export class SigninPage {
	currentUser: User = null;
	savedPassword: string = null;
	loginForm: FormGroup;

	usePinForm: boolean = false;
	usePin: boolean = false;

	emailInput: string;
	passwordInput: string;
	pinCodeInput: string;

	constructor(private navCtrl: NavController, private formBuilder: FormBuilder, public alertCtrl: AlertController, private authService: AuthenticationService,
		private storage: Storage, private splashScreen: SplashScreen, private platform: Platform) {
	}

	ionViewCanEnter() {
		this.init();
	}

	ionViewDidLoad() {
	}

	init() {
		this.createFormGroup();
		this.checkSavedPassword();
		this.checkLocalUser();
	}

	createFormGroup() {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
			pinpass: new FormControl('', []),
		});
	}

	signIn() {
		if (this.usePinForm == true) {
			if (this.usePin == true) {
				this.authService.signInByPin(this.currentUser.email, this.savedPassword, this.pinCodeInput);
			} else {
				this.authService.signIn(this.currentUser.email, this.pinCodeInput);
			}
		} else {
			this.authService.signIn(this.emailInput, this.passwordInput);
		}
	}

	checkLocalUser() {
		this.storage.get('currentUser').then(
			(result) => {
				if (result != null && result.pin_code != null) {
					this.currentUser = result;
					this.checkSavedPassword();
				}
			}
		);
	}

	checkSavedPassword() {
		this.storage.get('pass').then(
			(result) => {
				if (result != null) {
					this.savedPassword = result;
					this.usePIN();
				}
			}
		);
	}

	usePIN() {
		this.usePinForm = true;
		this.usePin = true;

		// Remove email and password controls
		// Change pin control to required
		this.loginForm.removeControl('email');
		this.loginForm.removeControl('password');
		this.loginForm.controls['pinpass'].setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]);
	}

	usePassword() {
		this.usePinForm = true;
		this.usePin = false;

		// Reset pin control
		// Add password validators
		this.loginForm.controls['pinpass'].clearValidators();
		this.loginForm.controls['pinpass'].setValidators(
			[
				Validators.required,
				CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true })
			]
		);
	}

	navigateToRegister() {
		this.navCtrl.push(SignupPage);
	}

	navigateToReset() {
		this.navCtrl.push(ResetPasswordPage);
	}
}
