import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import Preferences from '../../shared/models/preferences.model';
import { UserService } from '../../shared/services/user.service';

@IonicPage()
@Component({
	selector: 'page-alarm',
	templateUrl: 'alarm.html',
})
export class AlarmPage {
	preferences: Preferences;

	constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private storage: Storage, private alertCtrl: AlertController) { }

	ionViewWillEnter() {
		this.getPreferences();
	}

	getPreferences() {
		this.storage.get('preferences').then((result) => this.preferences = result);
	}

	submit() {
		this.userService.savePreferences(this.preferences).subscribe(
			(response) => { },
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
