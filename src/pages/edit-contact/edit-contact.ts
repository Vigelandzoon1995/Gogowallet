import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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

	constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService, private alertCtrl: AlertController) {
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
		this.contactService.delete(this.contact.user_id, this.contact.id).subscribe(
			(response) => this.navCtrl.popTo(this.navCtrl.getByIndex(2)),

		);
	}

	submit() {
		this.contactService.update(this.contact).subscribe(
			(response) => this.navCtrl.pop(),
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while updating. Please try again!',
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
