import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetsPage } from './budgets';

@NgModule({
	declarations: [
		BudgetsPage,
	],
	imports: [
		IonicPageModule.forChild(BudgetsPage),
	],
	exports: [BudgetsPage]
})
export class BudgetsPageModule { }
