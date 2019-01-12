import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { EditContactPage } from '../edit-contact/edit-contact';

@IonicPage()
@Component({
	selector: 'page-view-contact',
	templateUrl: 'view-contact.html',
})
export class ViewContactPage {
	contact: Contact = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService) {
		this.contact = this.navParams.get('data');
	}

	editContact() {
		this.navCtrl.push(EditContactPage, { data: this.contact });
	}
}
