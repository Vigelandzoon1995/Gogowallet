import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmergencyContactService } from '../../services/emergency-contacts/emergency-contacts-service';

@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {
  contact: Contact;
  contactForm: FormGroup;
  name: string;
  phone: string;
  notes: string;
  thumbnail: string;


  constructor( private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,private emergencyContactService: EmergencyContactService) {
    this.prepareContactForm();
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  prepareContactForm(){
    this.contact = this.navParams.get('data');
  }
  createFormGroup() {
    this.contactForm = this.formBuilder.group({
      name  : new FormControl('', [Validators.required]),
      phone: new FormControl('', [ Validators.required]),
      notes: new FormControl('', []),
      thumbnail: new FormControl('', [ Validators.required]),
    });
  }
  delete(){
    this.emergencyContactService.deleteContact(this.contact);
    this.navCtrl.pop();
  }
  update(){
    //do something
  }

}
