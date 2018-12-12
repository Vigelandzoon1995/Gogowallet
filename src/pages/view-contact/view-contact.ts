import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';

@IonicPage()
@Component({
  selector: 'page-view-contact',
  templateUrl: 'view-contact.html',
})
export class ViewContactPage {
  contactId: number;
  contact: Contact = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService) {
    this.contactId = this.navParams.get('contact-id');
    this.getEmergencyContact();
  }

  ionViewDidLoad() {
  }

  getEmergencyContact() {
    this.contactService.getById(this.contactId).subscribe(
      (response) => this.contact = response,
      (error) => { }
    );
  }

}
