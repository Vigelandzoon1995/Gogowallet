import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Preferences from '../../shared/models/preferences.model';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-alarm',
	templateUrl: 'alarm.html',
})
export class AlarmPage {
	preferences: Preferences;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) { }

	ionViewWillEnter() {
		this.getPreferences();
	}

	getPreferences() {
		this.storage.get('preferences').then((result) => this.preferences = result);
	}
}
