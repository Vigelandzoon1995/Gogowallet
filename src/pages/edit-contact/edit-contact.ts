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
	contactForm: FormGroup;
	contact: Contact;

	constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService, private alertCtrl: AlertController) {
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

	delete() {
		const confirm = this.alertCtrl.create({
			title: 'Deleting ' + this.contact.name,
			message: 'Are you sure you want to delete this contact?',
			buttons: [
				{
					text: 'No'
				},
				{
					text: 'Yes',
					handler: () => {
						this.deleteContact();
					}
				}
			]
		});
		confirm.present();
	}

	deleteContact() {
		this.contactService.delete(this.contact.user_id, this.contact.id).subscribe(
			(response) => this.navCtrl.popTo(this.navCtrl.getByIndex(2)),
			(error) => {
				// Show error message
				const alert = this.alertCtrl.create({
					title: 'Error',
					subTitle: 'An error occured while deleting. Please try again!',
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
