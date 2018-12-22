import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  user: User;
  password: string = null;
  newPassword: string = null;
  base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private camera: Camera,
    private userService: UserService, private authService: AuthenticationService, private storage: Storage) {
    this.createFormGroup();
    this.getUser();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.profileForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      first_name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
      last_name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
      bank_account: new FormControl('', Validators.compose([Validators.pattern('/[^A-Za-z0-9]+/')])),
      password: new FormControl('', [
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ]),
      new_password: new FormControl('', [
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ])
    });
  }

  getUser() {
    this.storage.get('currentUser').then(
      (response) => this.user = response
    );
  }

  submit() {
    let newUser = this.user;

    if (this.password && this.newPassword) {
      if (this.password != this.newPassword) {
        newUser.password = this.newPassword;
      } else {
        newUser.password = null;
      }
    }

    this.userService.update(newUser).subscribe(
      (response) => {
        this.authService.removeUser(false);
        this.authService.saveUser(newUser, false);

        this.navCtrl.pop();
      },
      (error) => { Observable.throw(error); }
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
    }, (err) => {
      console.log(err);
    });
  }
}
