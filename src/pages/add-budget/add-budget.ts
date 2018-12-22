import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { BudgetsService2 } from '../../services/budgets/budgets';
import Budget from '../../shared/models/budget.model';

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

  constructor(private budgetsService2: BudgetsService2, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
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

    //Todo remove budgetsService2 when backend integrated
    this.budgetsService2.addBudget(this.budget);
    this.navCtrl.pop();
  }
}
