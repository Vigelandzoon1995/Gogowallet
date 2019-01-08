import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { EditContactPage } from '../edit-contact/edit-contact';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-view-contact',
	templateUrl: 'view-contact.html',
})
export class ViewContactPage {
	contactForm: FormGroup;
	contact: Contact = null;

	constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, private contactService: ContactService) {
		this.contact = this.navParams.get('data');
		this.createFormGroup();
	}

	ionViewDidLoad() {
	}

	createFormGroup() {
		this.contactForm = this.formBuilder.group({
			name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{0,}$/)])),
			notes: new FormControl('', Validators.compose([Validators.pattern(/[a-zA-Z0-9\.\-\_\ ]+(?!.*[\.\-\_]{4,})$/gm)])),
			thumbnail: new FormControl('', [Validators.required]),
		});
	}

	editContact() {
		this.navCtrl.push(EditContactPage, { data: this.contact});
	}

}
