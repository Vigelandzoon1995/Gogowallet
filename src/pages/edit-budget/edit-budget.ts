import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-budget',
  templateUrl: 'edit-budget.html',
})
export class EditBudgetPage {
  budget: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.budget = navParams.get('data');
  }

  ionViewDidLoad() {
  }

  update(){
    //Todo api call to update
    this.navCtrl.pop();
  }

}
