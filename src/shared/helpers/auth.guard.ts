import { Injectable, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SigninPage } from '../../pages/signin/signin';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard {
    @ViewChild('mainNav') nav: NavController;
    private isLoggedIn = false;

    constructor(private userService: UserService, private storage: Storage) { }

    canActivate() {
        if (!this.storage.get('auth_token')) {
            this.nav.push(SigninPage);
            this.isLoggedIn = false;

            return false;
        }

        return true;
    }

    signIn(email: string, password: string): Observable<any> {
        return this.userService.checkCredentials(email, password)
            .map(res => res.json())
            .map((result) => {
                this.storage.set('auth_token', result);
                this.isLoggedIn = true;

                return result;
            });
    }

    signOut() {
        this.storage.remove('auth_token');
        this.isLoggedIn = false;
    }

    checkToken() {
        return this.isLoggedIn;
    }
}
