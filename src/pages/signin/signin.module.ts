import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(SigninPage),
  ],
})
export class SigninPageModule { }
