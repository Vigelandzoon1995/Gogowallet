import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import User from '../../shared/models/user.model';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../shared/helpers/auth.guard';

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
    private transfer: FileTransfer, private DomSanitizer: DomSanitizer, private userService: UserService, private authGuard: AuthGuard) {
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
        this.authGuard.removeUser();
        this.authGuard.saveUser(response);
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
