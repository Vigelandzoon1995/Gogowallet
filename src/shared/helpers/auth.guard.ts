import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { SigninPage } from '../../pages/signin/signin';
import { NavController } from 'ionic-angular';

@Injectable()
export class AuthGuard {
    constructor(private navCtrl: NavController, private userService: UserService) { }

    // canActivate() {
    //     if (!this.userService.isLoggedIn()) {
    //         this.navCtrl.push(SigninPage);
    //         return false;
    //     }

    //     return true;
    // }
}
