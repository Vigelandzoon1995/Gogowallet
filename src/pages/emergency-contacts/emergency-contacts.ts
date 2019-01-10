import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmergencyContactService } from '../../services/emergency-contacts/emergency-contacts-service';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { AddContactPage } from '../add-contact/add-contact';
import { ViewContactPage } from '../view-contact/view-contact';

@IonicPage()
@Component({
	selector: 'page-emergency-contacts',
	templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {
	contacts: Contact[] = [];

	constructor(private emergencyContactService: EmergencyContactService, public navCtrl: NavController, public navParams: NavParams, public events: Events, private contactService: ContactService) {
		this.getContacts();
	}

	ionViewDidLoad() {
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
		this.contacts = this.emergencyContactService.getAll();
	}
}
