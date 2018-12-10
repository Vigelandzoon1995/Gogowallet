import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Transfer } from '@ionic-native/transfer';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PopoverComponent } from '../components/popover/popover';
import { AlarmPage } from '../pages/alarm/alarm';
import { BankInfoPage } from '../pages/bank-info/bank-info';
import { BudgetPage } from '../pages/budget/budget';
import { BudgetsPage } from '../pages/budgets/budgets';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
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
import { MyApp } from './app.component';


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
    EditProfilePage
  ],
  imports: [
    BrowserModule,
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
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
