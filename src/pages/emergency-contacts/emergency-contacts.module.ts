import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyContactsPage } from './emergency-contacts';

@NgModule({
	declarations: [
		EmergencyContactsPage,
	],
	imports: [
		IonicPageModule.forChild(EmergencyContactsPage),
	],
	exports: [EmergencyContactsPage]
})
export class EmergencyContactsPageModule { }
