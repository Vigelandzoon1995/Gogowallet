import { Injectable, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SigninPage } from '../../pages/signin/signin';
import User from '../models/user.model';

@Injectable()
export class AuthenticationService {
    @ViewChild('mainNav') nav: NavController;

    private isLoggedIn = false;
    private userService: any;

    constructor(private storage: Storage) { }

    setProvider(provider) {
        this.userService = provider;
    }

    canActivate() {
        if (!this.storage.get('auth_token')) {
            this.isLoggedIn = false;
            this.nav.push(SigninPage);
            return false;
        }

        return true;
    }

    signIn(email: string, password: string): Observable<any> {
        return this.userService.checkCredentials(email, password)
            .map(res => res.json())
            .map((result) => {
                this.setToken(result);
                this.isLoggedIn = true;

                return result;
            });
    }

    signOut() {
        this.storage.remove('auth_token');
        this.isLoggedIn = false;

        this.nav.push(SigninPage);
    }

    setToken(token: any) {
        this.storage.set('auth_token', token);
    }

    getToken(): String {
        let token = '';
        this.storage.get('auth_token').then((response) => { token = response });

        return token;
    }

    clearToken() {
        this.storage.remove('auth_token');
    }

    saveUser(user: User) {
        this.storage.set('currentUser', user);
    }

    removeUser() {
        this.storage.remove('currentUser');
    }
}
