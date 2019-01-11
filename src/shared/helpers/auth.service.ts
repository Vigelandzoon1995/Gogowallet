import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { environment as ENV } from '../../environments/environment';
import User from '../models/user.model';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthenticationService {
	public isLoggedIn: boolean = false;

	loginEvent = new EventEmitter();
	logoutEvent = new EventEmitter();

	constructor(private http: Http, private storage: Storage, private alertCtrl: AlertController, private loadingService: LoadingService) { }

	signIn(email: string, password: string): void {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(ENV.BASE_URL + '/login', { email: email, password: password }, { headers: headers })
			.map((result) => result.json())
			.subscribe(
				(response) => {
					if (response) {
						if (response.token != false) {
							this.setToken(response, password);
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

	signInByPin(email: string, password: string, pin: string): void {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(ENV.BASE_URL + '/login/pin', { email: email, password: password, pin: pin }, { headers: headers })
			.map((result) => result.json())
			.subscribe(
				(response) => {
					if (response) {
						if (response.token != false) {
							this.setToken(response, password);
							this.loginEvent.next(true);
						} else {
							// Show error message
							const alert = this.alertCtrl.create({
								title: 'Sign In',
								subTitle: 'You have entered an invalid username or pin code.',
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
						subTitle: 'You have entered an invalid username or pin code.',
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
		this.isLoggedIn = false;

		this.logoutEvent.next(true);
	}

	setToken(response: any, password: string) {
		this.storage.set('auth_token', JSON.stringify(response.token));
		this.storage.set('pass', password);
		this.saveUser(response.user, true);
	}

	getToken() {
		return this.storage.get('auth_token').then((response) => {
			let token = JSON.parse(response);
			return token;
		});
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

	saveUser(user: User, login: boolean) {
		this.storage.set('currentUser', user);
		if (login) {
			this.isLoggedIn = true;
		}
	}

	removeUser(login: boolean) {
		this.storage.remove('currentUser');
		this.storage.remove('pass');
		if (login) {
			this.isLoggedIn = false;
		}
	}

	clear() {
		this.clearToken();
		this.removeUser(true);
	}
}
