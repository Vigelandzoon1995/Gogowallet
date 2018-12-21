import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedbackPage } from '../feedback/feedback';
import { AboutUsPage } from '../about-us/about-us';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  navtoFeedback(){
    this.navCtrl.push(FeedbackPage); 
  }

  navtoAboutus(){
    this.navCtrl.push(AboutUsPage); 
  }

}
