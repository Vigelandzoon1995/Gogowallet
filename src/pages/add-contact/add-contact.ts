import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private contactService: ContactService) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
  }

  createFormGroup() {
    this.contactForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      notes: new FormControl('', []),
      thumbnail: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.contactService.create(this.contact).subscribe(
      (response) => this.navCtrl.pop(),
      (error) => { Observable.throw(error); }
    );
  }

}
