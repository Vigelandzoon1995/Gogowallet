import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { AlertController, Events, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { PopoverComponent } from '../../components/popover/popover';
import { AuthenticationService } from '../../shared/helpers/auth.service';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  currentUser: User = null;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    private localNotifications: LocalNotifications, private storage: Storage, private alertCtrl: AlertController, private authService: AuthenticationService,
    private userService: UserService) {
    this.getCurrentUser();
  }

  ionViewDidLoad() {
  }

  getCurrentUser() {
    this.storage.get('currentUser').then(
      (response) => {
        this.currentUser = response;

        // Check if user has pin already set, else ask to provide one
        if (this.currentUser.pin_code == null) {
          this.askForPin();
        }
      }
    );
  }

  askForPin() {
    const alert = this.alertCtrl.create({
      title: 'Authentication',
      message: "Enter a PIN with a minimum of 4 and maximum of 10 numbers.",
      cssClass: 'prompt-alert',
      inputs: [
        {
          name: 'pin',
          placeholder: '',
          type: 'tel',
          label: 'PIN',
          id: 'pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data) {
              this.currentUser.pin_code = data.pin;
              this.updateUser();
            }
          }
        }
      ]
    });
    alert.present();
  }

  updateUser() {
    let user = this.currentUser;
    user.password = null;

    this.userService.update(user).subscribe(
      (response) => {
        this.authService.saveUser(this.currentUser, false);
        const alert = this.alertCtrl.create({
          title: 'Authentication',
          subTitle: 'PIN has been set!',
          buttons: ['OK']
        });
        alert.present();
      },
      (error) => {
        const alert = this.alertCtrl.create({
          title: 'Authentication',
          subTitle: 'Could not set PIN, please try again!',
          buttons: ['OK']
        });
        alert.present();
        Observable.throw(error);
      }
    );
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData => {
      try {
        if (popoverData.item.match("Sign Out")) {
          this.signout();
        }
        else if (popoverData.item.match("Settings")) {
          this.goToSettingsPage()
        }
      } catch (Nullpointerexception) {
      }
    })
  }

  signout() {
    this.events.publish('user:signout');
  }

  goToSettingsPage() {
    this.events.publish('navTo:settings');
  }

  navigateToBudgets() {
    this.events.publish('navTo:budgets');
  }

  navigateToContacts() {
    this.events.publish('navTo:contacts');
  }

  notify() {
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null
    });
  }
}
