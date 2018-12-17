import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { environment as ENV } from '../../environments/environment';
import User from '../models/user.model';

@Injectable()
export class AuthenticationService {
    public isLoggedIn: boolean = false;

    loginEvent = new EventEmitter();
    logoutEvent = new EventEmitter();

    constructor(private http: Http, private storage: Storage, private alertCtrl: AlertController) { }

    signIn(email: string, password: string): void {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(ENV.BASE_URL + '/login', { email: email, password: password }, { headers: headers })
            .map((result) => result.json())
            .subscribe(
                (response) => {
                    if (response) {
                        if (response.token != false) {
                            this.setToken(response);
                            this.loginEvent.next(true);
                        } else {
                            // Show error message
                            const alert = this.alertCtrl.create({
                                title: 'Sign In',
                                subTitle: 'You have entered an invalid username or password.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: data => {
                                            //Redirect to login page
                                            this.logoutEvent.next(true);
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        }
                    }
                },
                (error) => {
                    // Show error message
                    const alert = this.alertCtrl.create({
                        title: 'Sign In',
                        subTitle: 'You have entered an invalid username or password.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: data => {
                                    //Redirect to login page
                                    this.logoutEvent.next(true);
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            );
    }

    register(user: User): void {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(ENV.BASE_URL + '/register', user, { headers: headers })
            .map((result) => result.json())
            .subscribe(
                (response) => {
                    if (response) {
                        if (response.success != false) {
                            //Show success message
                            const alert = this.alertCtrl.create({
                                title: 'Successfully Registered',
                                subTitle: 'You have successfully been registered.',
                                buttons: [
                                    {
                                        text: 'OK',
                                        handler: data => {
                                            //Redirect to login page
                                            this.logoutEvent.next(true);
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        }
                    }
                },
                (error) => {
                    // Show error message
                    const alert = this.alertCtrl.create({
                        title: 'Registration',
                        subTitle: 'An error occured while registering. Please try again.',
                        buttons: [
                            {
                                text: 'OK',
                                handler: data => {
                                    //Redirect to login page
                                    this.logoutEvent.next(true);
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            );
    }

    signOut() {
        this.clearToken();
        this.removeUser();

        this.logoutEvent.next(true);
    }

    setToken(response: any) {
        this.storage.set('auth_token', response.token);
        this.saveUser(response.user);
    }

    getToken(): String {
        let token = '';
        this.storage.get('auth_token').then((response) => { token = response });

        return token;
    }

    clearToken() {
        this.storage.remove('auth_token');
    }

    getUser(): User {
        let user;
        this.storage.get('currentUser').then(
            (result) => user = result
        );
        return user;
    }

    saveUser(user: User) {
        if (user.profile_picture) {
            user.profile_picture = 'data:image/png;base64,' + user.profile_picture;
        }
        this.storage.set('currentUser', user);
        this.isLoggedIn = true;
    }

    removeUser() {
        this.storage.remove('currentUser');
        this.isLoggedIn = false;
    }

    clear() {
        this.clearToken();
        this.removeUser();
    }
}
