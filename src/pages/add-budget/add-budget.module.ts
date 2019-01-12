import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBudgetPage } from './add-budget';

@NgModule({
	declarations: [
		AddBudgetPage,
	],
	imports: [
		IonicPageModule.forChild(AddBudgetPage),
	],
	exports: [AddBudgetPage]
})
export class AddBudgetPageModule { }
