import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	resetForm: FormGroup;
	email: string;

	constructor(private navCtrl: NavController, private formBuilder: FormBuilder, public alertCtrl: AlertController, private userService: UserService) {
		this.createFormGroup();
	}

	ionViewDidLoad() {
	}

	createFormGroup() {
		this.resetForm = this.formBuilder.group({
			email: new FormControl('', [Validators.required, Validators.email]),
		});
	}

	submit() {
		this.userService.resetPassword(this.email).subscribe(
			(response) => this.showAlert(),
			(error) => { Observable.throw(error); }
		);
	}

	showAlert() {
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
