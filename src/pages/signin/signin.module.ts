import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import { FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(SigninPage),
  ],
})
export class SigninPageModule {}
