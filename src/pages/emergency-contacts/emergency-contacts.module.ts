import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyContactsPage } from './emergency-contacts';
import { Storage } from '@ionic/storage';

@NgModule({
	declarations: [
		EmergencyContactsPage,
	],
	imports: [
		IonicPageModule.forChild(EmergencyContactsPage),
	],
	providers: [Storage]
})
export class EmergencyContactsPageModule { }
