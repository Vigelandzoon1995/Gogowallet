import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddContactPage } from '../add-contact/add-contact';
import Contact from '../../shared/models/contact.model';
import { ViewContactPage } from '../view-contact/view-contact';

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {
  contacts: Contact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.getContacts();
  }

  ionViewDidLoad() {
  }

  addContact() {
    this.navCtrl.push(AddContactPage);
  }

  showDetails(id: number) {
    this.navCtrl.push(ViewContactPage, id);
  }

  getContacts() {
    this.contacts = [
      {
        id: 1,
        user_id: 1,
        name: 'Rabobank',
        phone: '088 722 67 67',
        thumbnail: 'card',
        notes: ''
      },
      {
        id: 2,
        user_id: 1,
        name: 'ABN AMRO',
        phone: '0900 0024',
        thumbnail: 'card',
        notes: ''
      }
    ];
  }
}
