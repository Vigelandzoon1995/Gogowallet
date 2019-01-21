import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Transfer } from '@ionic-native/transfer';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BLEComponent } from '../components/bleComponent/ble';
import { BudgetItemPopoverComponent } from '../components/budget-item-popover/budget-item-popover';
import { PopoverComponent } from '../components/popover/popover';
import { AboutUsPageModule } from '../pages/about-us/about-us.module';
import { AddBudgetPageModule } from '../pages/add-budget/add-budget.module';
import { AddContactPageModule } from '../pages/add-contact/add-contact.module';
import { AlarmPageModule } from '../pages/alarm/alarm.module';
import { BudgetsPageModule } from '../pages/budgets/budgets.module';
import { EditBudgetPageModule } from '../pages/edit-budget/edit-budget.module';
import { EditContactPageModule } from '../pages/edit-contact/edit-contact.module';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { EmergencyContactsPageModule } from '../pages/emergency-contacts/emergency-contacts.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { OverviewPageModule } from '../pages/overview/overview.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SetupPageModule } from '../pages/setup/setup.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { TabsPage } from '../pages/tabs/tabs';
import { TrackPageModule } from '../pages/track/track.module';
import { ViewContactPageModule } from '../pages/view-contact/view-contact.module';
import { AuthenticationService } from '../shared/helpers/auth.service';
import { BudgetHelper } from '../shared/helpers/budget.helper';
import { LoadingService } from '../shared/helpers/loading.service';
import { BudgetService } from '../shared/services/budget.service';
import { ContactService } from '../shared/services/contact.service';
import { LocationService } from '../shared/services/location.service';
import { TransactionService } from '../shared/services/transaction.service';
import { UserService } from '../shared/services/user.service';
import { MyApp } from './app.component';

@NgModule({
	declarations: [
		MyApp,
		PopoverComponent,
		BudgetItemPopoverComponent,
		TabsPage,
		BLEComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		SigninPageModule,
		SignupPageModule,
		OverviewPageModule,
		TrackPageModule,
		AlarmPageModule,
		ProfilePageModule,
		FeedbackPageModule,
		SettingsPageModule,
		BudgetsPageModule,
		AddBudgetPageModule,
		EditProfilePageModule,
		EmergencyContactsPageModule,
		AddContactPageModule,
		EditBudgetPageModule,
		EditContactPageModule,
		AboutUsPageModule,
		ViewContactPageModule,
		SetupPageModule,
		IonicModule.forRoot(MyApp, {
			scrollAssist: false,
			autoFocusAssist: false,
			scrollPadding: false
		}),
		IonicStorageModule.forRoot(),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		PopoverComponent,
		BudgetItemPopoverComponent,
		TabsPage,
		BLEComponent
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
		TransactionService,
		Geolocation,
		LoadingService,
		LocationService,
		BudgetHelper,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
