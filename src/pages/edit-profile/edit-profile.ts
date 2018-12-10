import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomValidators } from '../../shared/helpers/custom-validators';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  profileForm: FormGroup;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private camera: Camera,
    private DomSanitizer: DomSanitizer) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.profileForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has all the requirements
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ]),
      new_password: new FormControl('', [
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has all the requirements
        CustomValidators.patternValidator(/^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, { hasPassed: true }),
      ])
    });
  }

  uploadImage() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }
}
