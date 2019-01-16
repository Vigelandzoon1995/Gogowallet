import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import User from '../../shared/models/user.model';
import { EditProfilePage } from '../edit-profile/edit-profile';

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

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => this.currentUser = response
		);
	}

	navigateToEditProfile() {
		this.navCtrl.push(EditProfilePage, {
			data: this.currentUser.user_id
		});
	}

	navigateToContacts() {
		this.events.publish('navTo:contacts');
	}

	navigateToSetup() {
		this.events.publish('navTo:setup');
	}
}
