import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmergencyContactService } from '../../services/emergency-contacts/emergency-contacts-service';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';

@IonicPage()
@Component({
	selector: 'page-add-contact',
	templateUrl: 'add-contact.html',
})
export class AddContactPage {
	contactForm: FormGroup;
	contact: Contact = new Contact();

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private contactService: ContactService, private emergencyContactService: EmergencyContactService) {
		this.createFormGroup();
	}

	ionViewDidLoad() {
	}

	createFormGroup() {
		this.contactForm = this.formBuilder.group({
			name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])),
			notes: new FormControl('', Validators.compose([Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			thumbnail: new FormControl('', [Validators.required]),
		});
	}

	submit() {
		this.emergencyContactService.addContact(this.contact);
		this.navCtrl.pop();
		// this.contactService.create(this.contact).subscribe(
		//   (response) =>  this.navCtrl.pop(),
		//   (error) => { Observable.throw(error); }
		// );
	}

}
