import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';
import { SignupPage } from '../signup/signup';

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
		private storage: Storage, private splashScreen: SplashScreen, private platform: Platform) { }


	ionViewCanEnter() {
		this.init();
	}

	init() {
		this.createFormGroup();
	}

	createFormGroup() {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
			pinpass: new FormControl('', []),
		});

		this.checkLocalUser();
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
				if (result != null) {
					this.currentUser = result;
					this.checkSavedPassword().then((result) => {
						if (result == true) {
							this.usePIN()
						} else {
							this.usePassword();
						}
					});
				}
			}
		);
	}

	checkSavedPassword(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.storage.get('pass').then(
				(result) => {
					if (result != null) {
						this.savedPassword = result;

						if (this.currentUser.pin_code != null) {
							resolve(true);
						}
					}
				}
			);
		});
	}

	usePIN() {
		this.usePinForm = true;
		this.usePin = true;

		// Remove email and password controls
		// Change pin control to required
		this.loginForm.removeControl('email');
		this.loginForm.removeControl('password');
		this.loginForm.controls['pinpass'].clearValidators();
		this.loginForm.controls['pinpass'].setValidators(
			[
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(10),
				Validators.pattern(/^[0-9]*$/)
			]
		);
	}

	usePassword() {
		this.usePinForm = true;
		this.usePin = false;

		// Remove email and password controls
		// Change pin control to required
		// Reset pin control
		// Add password validators
		this.loginForm.removeControl('email');
		this.loginForm.removeControl('password');
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
}
