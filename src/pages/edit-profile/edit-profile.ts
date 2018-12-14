import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
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
  newPassword: string;
  base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private camera: Camera,
    private transfer: FileTransfer, private DomSanitizer: DomSanitizer, private userService: UserService, private authService: AuthenticationService) {
    this.createFormGroup();
    this.getUser();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.profileForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ]),
      new_password: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ])
    });
  }

  getUser() {
    this.user = new User();
  }

  submit() {
    this.userService.update(this.user).subscribe(
      (response) => {
        this.authService.removeUser();
        this.authService.saveUser(response);
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
