import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { AddContactPage } from '../add-contact/add-contact';
import { ViewContactPage } from '../view-contact/view-contact';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {
  contacts: Contact[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private contactService: ContactService) {
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

    // this.contactService.getAll().subscribe(
    //   (response) => this.contacts = response,
    //   (error) => { Observable.throw(error); }
    // );
  }
}
