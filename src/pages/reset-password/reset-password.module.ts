import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(ResetPasswordPage),
  ],
})
export class ResetPasswordPageModule { }
