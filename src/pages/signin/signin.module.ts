import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { FormsModule } from '@angular/forms'
import { AuthGuard } from '../../shared/helpers/auth.guard';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(SigninPage),
  ],
  providers: [AuthGuard]
})
export class SigninPageModule { }
