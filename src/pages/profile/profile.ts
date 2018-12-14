import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import User from '../../shared/models/user.model';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  currentUser: User = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: Storage, private DomSanitizer: DomSanitizer) {
    this.getCurrentUser();
  }

  ionViewDidLoad() {
  }

  getCurrentUser() {
    if (this.storage.get('currentUser') != null) {
      this.storage.get('currentUser').then((response) => this.currentUser = response);
    }
  }
  navigateToEditProfile() {
    this.events.publish('navTo:editprofilepage');
  }

}
