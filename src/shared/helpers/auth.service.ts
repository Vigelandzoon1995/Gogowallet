import { Injectable, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { SigninPage } from '../../pages/signin/signin';
import User from '../models/user.model';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    @ViewChild('mainNav') nav: NavController;

    private isLoggedIn = false;

    constructor(private http: Http, private storage: Storage) { }

    canActivate() {
        if (!this.storage.get('auth_token')) {
            this.isLoggedIn = false;
            this.nav.push(SigninPage);
            return false;
        }

        return true;
    }

    signIn(email: string, password: string): Observable<any> {
        return this.http.post(ENV.BASE_URL + '/login', { email: email, password: password })
            .pipe(catchError(error => Observable.throw(error)))
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
