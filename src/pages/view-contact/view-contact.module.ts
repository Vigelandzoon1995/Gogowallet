import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewContactPage } from './view-contact';

@NgModule({
  declarations: [
    ViewContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewContactPage),
  ],
})
export class ViewContactPageModule {}
