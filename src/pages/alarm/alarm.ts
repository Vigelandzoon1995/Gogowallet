import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import Preferences from '../../shared/models/preferences.model';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-alarm',
	templateUrl: 'alarm.html',
})
export class AlarmPage {
	preferences: Preferences;
	alarmForm: FormGroup;
	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private storage: Storage, private alertCtrl: AlertController, private formBuilder: FormBuilder) {
		this.getPreferences();
		this.createFormGroup();
	 }

	ionViewWillEnter() {
		this.getPreferences();	
	}

	createFormGroup() {
		this.alarmForm = this.formBuilder.group({
			distance_alarm: new FormControl('', Validators.compose([Validators.required])),
			lock_protection: new FormControl('', Validators.compose([Validators.required])),
			max_distance: new FormControl('', Validators.compose([Validators.required])),
		});
	}

	getPreferences() {
		//this.storage.get('preferences').then((result) => this.preferences = result);
		this.preferences = new Preferences();
		this.preferences.distance_alarm = true;
		this.preferences.lock_protection = true;
		this.preferences.max_distance = 5;
	}

	submit() {
		this.userService.savePreferences(this.preferences).subscribe(
			(response) => this.storage.set('preferences', response),
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while updating. Please try again!',
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
}
