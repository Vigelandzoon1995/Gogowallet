import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import Contact from '../../shared/models/contact.model';
import User from '../../shared/models/user.model';
import { ContactService } from '../../shared/services/contact.service';

@IonicPage()
@Component({
	selector: 'page-add-contact',
	templateUrl: 'add-contact.html',
})
export class AddContactPage {
	currentUser: User = null;
	contactForm: FormGroup;
	contact: Contact = new Contact();

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private contactService: ContactService, private alertCtrl: AlertController,
		private storage: Storage) {
		this.getCurrentUser();
		this.createFormGroup();
	}

	getCurrentUser() {
		this.storage.get('currentUser').then(
			(response) => this.currentUser = response
		);
	}

	createFormGroup() {
		this.contactForm = this.formBuilder.group({
			name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/)])),
			phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])),
			notes: new FormControl('', Validators.compose([Validators.pattern(/^([a-zA-Z-0-9]+?)([-\s'][a-zA-Z-0-9]+)*?$/)])),
			thumbnail: new FormControl('', [Validators.required]),
		});
	}

	submit() {
		this.contact.user_id = this.currentUser.user_id;
		this.contactService.create(this.contact).subscribe(
			(response) => this.navCtrl.pop(),
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while saving. Please try again!',
					buttons: [
						{
							text: 'OK',
						}
					]
				});
				alert.present();
			}
		);
	}
}
