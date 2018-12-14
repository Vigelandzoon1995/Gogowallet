import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import User from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationService {
    private isLoggedIn = false;

    constructor(private userService: UserService, private storage: Storage) { }

    canActivate() {
        if (!this.storage.get('auth_token')) {
            this.isLoggedIn = false;
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
