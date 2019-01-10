import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import Budget from '../../shared/models/budget.model';

@IonicPage()
@Component({
	selector: 'page-edit-budget',
	templateUrl: 'edit-budget.html',
})
export class EditBudgetPage {
	budgetForm: FormGroup;
	budget: Budget;
	minDate: string = new Date().toJSON().split('T')[0];
	start: string;
	end: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
		this.budget = navParams.get('data');
		this.createFormGroup();

		this.start = moment(this.budget.start_date).local(true).format('YYYY-MM-DDTHH:mm');
		this.end = moment(this.budget.end_date).local(true).format('YYYY-MM-DDTHH:mm');
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

	update() {
		this.budget.start_date = moment.utc(this.start).toDate();
		this.budget.end_date = moment.utc(this.end).toDate();

		//Todo api call to update
		this.navCtrl.pop();
	}
}
