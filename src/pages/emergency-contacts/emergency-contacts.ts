import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { AddContactPage } from '../add-contact/add-contact';
import { ViewContactPage } from '../view-contact/view-contact';
import { Observable } from 'rxjs';
import { EditContactPage } from '../edit-contact/edit-contact';
import { EmergencyContactService } from '../../services/emergency-contacts/emergency-contacts-service';

@IonicPage()
@Component({
  selector: 'page-emergency-contacts',
  templateUrl: 'emergency-contacts.html',
})
export class EmergencyContactsPage {
  contacts:  {contacts: Contact[]}[];;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private contactService: ContactService, private emergencyContactService: EmergencyContactService) {
    this.getContacts();
  }

  ionViewDidLoad() {
  }

  addContact() {
    this.navCtrl.push(AddContactPage);
  }

  showDetails(contact) {
   // this.navCtrl.push(ViewContactPage, id);
    this.navCtrl.push(EditContactPage,{
      data: contact
    });
  }

  getContacts() {
    this.contacts = this.emergencyContactService.getAll();
  }
}
