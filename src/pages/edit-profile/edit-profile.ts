import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@IonicPage()
@Component({
	selector: 'page-edit-profile',
	templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
	profileForm: FormGroup;
	userId: number;
	user: User;
	base64Image: string;

	clearStorage: boolean = false;
	password: string = null;
	newPassword: string = null;

	constructor(public navParams: NavParams, public navCtrl: NavController, private formBuilder: FormBuilder, private camera: Camera,
		private userService: UserService, private authService: AuthenticationService, private storage: Storage, private alertCtrl: AlertController) {
		this.createFormGroup();
	}

	ionViewWillEnter() {
		this.userId = this.navParams.get('data');
		this.getUser();
	}

	createFormGroup() {
		this.profileForm = this.formBuilder.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
			first_name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\-\ ]{4,}$/)])),
			last_name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\.\-\ ]{4,}$/)])),
			bank_account: new FormControl('', Validators.compose([Validators.pattern(/^[a-zA-Z0-9]+$/)])),
			pin: new FormControl('', Validators.compose([Validators.pattern(/^[0-9]*$/)])),
			password: new FormControl('', [
				CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
			]),
			new_password: new FormControl('', [
				CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
			])
		});
	}

	getUser() {
		this.userService.getById(this.userId).subscribe(
			(response) => this.user = response,
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while retrieving user details. Please try again!',
					buttons: [
						{
							text: 'OK',
						}
					]
				});
				alert.present();
			}
		);
	}

	submit() {
		let newUser = this.user;
		newUser.password = null;

		// Check if password has changed
		if (this.password != null && this.newPassword != null) {
			if (this.password != this.newPassword) {
				newUser.password = this.newPassword;
			}
		}

		this.userService.update(newUser).subscribe(
			(response) => {
				this.authService.removeUser(false);
				this.authService.saveUser(newUser, false);

				this.navCtrl.pop();
			},
			(error) => {
				Observable.throw(error);
			}
		);
	}

	uploadImage() {
		const options: CameraOptions = {
			quality: 50, // picture quality
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		};

		this.camera.getPicture(options).then((imageData) => {
			this.base64Image = "data:image/jpeg;base64," + imageData;
			this.user.profile_picture = this.base64Image;
		}, (error) => {
			Observable.throw(error);
		});
	}
}
