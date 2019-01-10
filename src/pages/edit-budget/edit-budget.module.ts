import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBudgetPage } from './edit-budget';

@NgModule({
	declarations: [
		EditBudgetPage,
	],
	imports: [
		IonicPageModule.forChild(EditBudgetPage),
	],
})
export class EditBudgetPageModule { }
