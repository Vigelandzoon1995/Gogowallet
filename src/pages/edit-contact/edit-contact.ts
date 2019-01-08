import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmergencyContactService } from '../../services/emergency-contacts/emergency-contacts-service';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';

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


	constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService, private emergencyContactService: EmergencyContactService) {
		this.prepareContactForm();
		this.createFormGroup();
	}

	ionViewDidLoad() {
	}

	prepareContactForm() {
		this.contact = this.navParams.get('data');
	}
	createFormGroup() {
		this.contactForm = this.formBuilder.group({
			name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{0,}$/)])),
			notes: new FormControl('', Validators.compose([Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			thumbnail: new FormControl('', [Validators.required]),
		});
	}

	delete() {
		this.emergencyContactService.deleteContact(this.contact);
		this.navCtrl.pop();
	}

	update() {
		//do something
	}

}
