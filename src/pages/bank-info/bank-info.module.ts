import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankInfoPage } from './bank-info';

@NgModule({
  declarations: [
    BankInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BankInfoPage),
  ],
})
export class BankInfoPageModule {}
