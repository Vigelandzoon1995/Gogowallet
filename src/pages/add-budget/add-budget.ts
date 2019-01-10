import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import Budget from '../../shared/models/budget.model';
import { BudgetService } from '../../shared/services/budget.service';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
	selector: 'page-budget',
	templateUrl: 'add-budget.html',
})
export class AddBudgetPage {
	budgetForm: FormGroup;
	budget: Budget = new Budget();
	minDate: string = new Date().toJSON().split('T')[0];
	start: string = new Date().toJSON();
	end: string = new Date().toJSON();

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private budgetService: BudgetService, private alertCtrl: AlertController) {
		this.createFormGroup();
	}

	ionViewDidLoad() {
	}

	createFormGroup() {
		this.budgetForm = this.formBuilder.group({
			category: new FormControl('', Validators.compose([Validators.required])),
			start_date: new FormControl('', Validators.compose([Validators.required])),
			end_date: new FormControl('', Validators.compose([Validators.required])),
			amount: new FormControl('', Validators.compose([Validators.required])),
			limit_lock: new FormControl('', Validators.compose([Validators.required])),
			alarm: new FormControl('', Validators.compose([Validators.required])),
		});
	}

	save() {
		this.budget.start_date = moment.utc(this.start).toDate();
		this.budget.end_date = moment.utc(this.end).toDate();

		this.budgetService.create(this.budget).subscribe(
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
