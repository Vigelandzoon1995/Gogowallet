import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { OverviewPage } from '../pages/overview/overview';
import { TrackPage } from '../pages/track/track';
import { AlarmPage } from '../pages/alarm/alarm';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverComponent } from '../components/popover/popover';
import { SettingsPage } from '../pages/settings/settings';
import { BankInfoPage } from '../pages/bank-info/bank-info';
import { GogowalletPage } from '../pages/gogowallet/gogowallet';
import { BudgetsPage } from '../pages/budgets/budgets';
import { BudgetPage } from '../pages/budget/budget';

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
    TabsPage
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
