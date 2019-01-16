import { Component, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NavController, Platform, Navbar } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthenticationService } from '../shared/helpers/auth.service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild('mainNav') nav: NavController;
	rootPage: any = null;
	hideSplash: boolean = true;

	constructor(platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen, private androidPermissions: AndroidPermissions,
		private localNotifications: LocalNotifications, private authService: AuthenticationService) {
		//Subscribe to events of Authentication Service
		this.authService.logoutEvent.subscribe(
			res => {
				this.nav.push(SigninPage);
			}
		);

		this.authService.loginEvent.subscribe(
			res => {
				this.nav.push(TabsPage);
			}
		);

		this.rootPage = SigninPage;

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleBlackTranslucent();

			this.checkPermissions();

			if (!this.hideSplash) {
				setTimeout(() => {
					this.splashScreen.hide();
				}, 300);
			}
		});
	}

	checkPermissions() {
		let hasPermissions = true;
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.VIBRATE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BLUETOOTH).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });


		if (!this.localNotifications.hasPermission) hasPermissions = false;
		if (!hasPermissions) this.askPermissions();
		else this.hideSplash = false;
	}

	askPermissions() {
		this.androidPermissions.requestPermissions(
			[
				this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
				this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
				this.androidPermissions.PERMISSION.VIBRATE,
				this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
				this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
				this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS,
				this.androidPermissions.PERMISSION.BLUETOOTH,
				this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN,
			]);
		this.localNotifications.requestPermission();
		this.hideSplash = false;
	}
}
