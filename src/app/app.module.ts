import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PopoverComponent } from '../components/popover/popover';
import { AlarmPage } from '../pages/alarm/alarm';
import { BankInfoPage } from '../pages/bank-info/bank-info';
import { BudgetPage } from '../pages/budget/budget';
import { BudgetsPage } from '../pages/budgets/budgets';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EmergencyContactsPage } from '../pages/emergency-contacts/emergency-contacts';
import { GogowalletPage } from '../pages/gogowallet/gogowallet';
import { NotificationPage } from '../pages/notification/notification';
import { OverviewPage } from '../pages/overview/overview';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackPage } from '../pages/track/track';
import { AuthService } from '../shared/authentication/auth.service';
import { MyApp } from './app.component';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => localStorage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    OverviewPage,
    TrackPage,
    AlarmPage,
    NotificationPage,
    ProfilePage,
    PopoverComponent,
    SettingsPage,
    BankInfoPage,
    GogowalletPage,
    BudgetsPage,
    BudgetPage,
    TabsPage,
    ResetPasswordPage,
    EditProfilePage,
    EmergencyContactsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    OverviewPage,
    TrackPage,
    AlarmPage,
    NotificationPage,
    ProfilePage,
    PopoverComponent,
    SettingsPage,
    BankInfoPage,
    GogowalletPage,
    BudgetsPage,
    BudgetPage,
    TabsPage,
    ResetPasswordPage,
    EditProfilePage,
    EmergencyContactsPage
  ],
  providers: [
    StatusBar,
    JwtHelper,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
