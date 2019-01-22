import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import { AlarmPage } from '../alarm/alarm';
import { BudgetsPage } from '../budgets/budgets';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { EmergencyContactsPage } from '../emergency-contacts/emergency-contacts';
import { OverviewPage } from '../overview/overview';
import { ProfilePage } from '../profile/profile';
import { SetupPage } from '../setup/setup';
import { TrackPage } from '../track/track';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	tab1Root = OverviewPage;
	tab2Root = TrackPage;
	tab3Root = AlarmPage;
	tab4Root = ProfilePage;

	constructor(private navCtrl: NavController, public events: Events, private authService: AuthenticationService) {
		this.subscribeEvents();
	}

	subscribeEvents() {
		this.events.subscribe('user:signout', () => {
			this.authService.signOut();
		});
		this.events.subscribe('navTo:budgets', () => {
			this.navCtrl.push(BudgetsPage);
		});
		this.events.subscribe('navTo:contacts', () => {
			this.navCtrl.push(EmergencyContactsPage);
		});
		this.events.subscribe('navTo:editprofilepage', () => {
			this.navCtrl.push(EditProfilePage);
		});
		this.events.subscribe('navTo:setup', () => {
			this.navCtrl.push(SetupPage);
		});
	}
}
