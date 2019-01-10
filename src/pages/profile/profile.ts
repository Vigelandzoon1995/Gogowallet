import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import User from '../../shared/models/user.model';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	currentUser: User = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: Storage) {
		this.getCurrentUser();
	}

	ionViewDidLoad() {
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => this.currentUser = response
		);
	}

	navigateToEditProfile() {
		this.events.publish('navTo:editprofilepage');
	}

	navigateToContacts() {
		this.events.publish('navTo:contacts');
	}

	navigateToSetup() {
		this.events.publish('navTo:setup');
	}
}
