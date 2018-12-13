import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SigninPage } from '../../pages/signin/signin';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard {
    private isLoggedIn = false;

    constructor(private navCtrl: NavController, private userService: UserService, private storage: Storage) { }

    canActivate() {
        if (!this.storage.getItem('auth_token')) {
            this.navCtrl.push(SigninPage);
            this.isLoggedIn = false;

            return false;
        }

        return true;
    }

    signIn(email: string, password: string): Observable<any> {
        return this.userService.checkCredentials(email, password)
            .map(res => res.json())
            .map((result) => {
                this.storage.setItem('auth_token', result);
                this.isLoggedIn = true;

                return result;
            });
    }

    signOut() {
        this.storage.removeItem('auth_token');
        this.isLoggedIn = false;
    }

    checkToken() {
        return this.isLoggedIn;
    }
}
