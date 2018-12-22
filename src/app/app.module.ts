import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationService } from '@ionic-native/google-maps';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BudgetItemPopoverComponent } from '../components/budget-item-popover/budget-item-popover';
import { PopoverComponent } from '../components/popover/popover';
import { AboutUsPage } from '../pages/about-us/about-us';
import { AddBudgetPage } from '../pages/add-budget/add-budget';
import { AddContactPage } from '../pages/add-contact/add-contact';
import { AlarmPage } from '../pages/alarm/alarm';
import { BudgetsPage } from '../pages/budgets/budgets';
import { EditBudgetPage } from '../pages/edit-budget/edit-budget';
import { EditContactPage } from '../pages/edit-contact/edit-contact';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EmergencyContactsPage } from '../pages/emergency-contacts/emergency-contacts';
import { FeedbackPage } from '../pages/feedback/feedback';
import { GogowalletPage } from '../pages/gogowallet/gogowallet';
import { OverviewPage } from '../pages/overview/overview';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SettingsPage } from '../pages/settings/settings';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackPage } from '../pages/track/track';
//Todo Delete ../services/### BudgetsService2, EmergencyContactService when shareService is integrated
import { BudgetsService2 } from '../services/budgets/budgets';
import { EmergencyContactService } from '../services/emergency-contacts/emergency-contacts-service';
import { AuthenticationService } from '../shared/helpers/auth.service';
import { BudgetService } from '../shared/services/budget.service';
import { ContactService } from '../shared/services/contact.service';
import { TransactionService } from '../shared/services/transaction.service';
import { UserService } from '../shared/services/user.service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    OverviewPage,
    TrackPage,
    AlarmPage,
    ProfilePage,
    PopoverComponent,
    BudgetItemPopoverComponent,
    FeedbackPage,
    SettingsPage,
    GogowalletPage,
    BudgetsPage,
    AddBudgetPage,
    TabsPage,
    ResetPasswordPage,
    EditProfilePage,
    EmergencyContactsPage,
    AddContactPage,
    EditBudgetPage,
    EditContactPage,
    AboutUsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    OverviewPage,
    TrackPage,
    AlarmPage,
    ProfilePage,
    PopoverComponent,
    BudgetItemPopoverComponent,
    SettingsPage,
    GogowalletPage,
    BudgetsPage,
    AddBudgetPage,
    TabsPage,
    ResetPasswordPage,
    EditProfilePage,
    EmergencyContactsPage,
    AddContactPage,
    EditBudgetPage,
    EditContactPage,
    FeedbackPage,
    AboutUsPage
  ],
  providers: [
    AuthenticationService,
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileTransferObject,
    File,
    Transfer,
    Camera,
    LocalNotifications,
    FilePath,
    AndroidPermissions,
    UserService,
    LocationService,
    ContactService,
    BudgetService,
    BudgetsService2,
    EmergencyContactService,
    TransactionService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
