import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import User from '../../shared/models/user.model';
import { ContactService } from '../../shared/services/contact.service';
import { AddContactPage } from '../add-contact/add-contact';
import { ViewContactPage } from '../view-contact/view-contact';

@IonicPage()
@Component({
	selector: 'page-emergency-contacts',
	templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {
	currentUser: User = null;
	contacts: Contact[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private contactService: ContactService, private storage: Storage,
		private alertCtrl: AlertController) {
		this.getCurrentUser();
	}

	ionViewDidLoad() {
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => {
				this.currentUser = response;
				this.getContacts();
			}
		);
	}

	addContact() {
		this.navCtrl.push(AddContactPage);
	}

	showDetails(contact) {
		this.navCtrl.push(ViewContactPage, {
			data: contact
		});
	}

	getContacts() {
		this.contactService.getAll(this.currentUser.user_id).subscribe(
			(response) => {
				this.contacts = response;
			},
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while retrieving contacts. Please try again!',
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
