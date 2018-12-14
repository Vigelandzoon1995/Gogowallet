import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen, private androidPermissions: AndroidPermissions,
    private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('android')) {
        this.checkPermissions();
      }
    });
  }

  checkPermissions() {
    let hasPermissions = true;
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.VIBRATE).then((result) => { if (!result.hasPermission) { hasPermissions = false; } });

    if (!this.localNotifications.hasPermission) hasPermissions = false;

    if (!hasPermissions) {
      this.askPermissions();
    }
  }

  askPermissions() {
    this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.VIBRATE,
      ]);
    this.localNotifications.requestPermission();
  }
}
