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

		//Show loading spinner
		this.loadingService.show();

		this.http.post(ENV.BASE_URL + '/login', { email: email, password: password }, { headers: headers })
			.map((result) => result.json())
			._finally(() => {
				this.loadingService.hide();
			})
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

		//Show loading spinner
		this.loadingService.show();

		this.http.post(ENV.BASE_URL + '/login/pin', { email: email, password: password, pin: pin }, { headers: headers })
			.map((result) => result.json())
			._finally(() => {
				this.loadingService.hide();
			})
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

		//Show loading spinner
		this.loadingService.show();

		if (user.profile_picture == null || user.profile_picture == '') {
			user.profile_picture = 'data:image/jpg;base64,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';
		}

		this.http.post(ENV.BASE_URL + '/register', user, { headers: headers })
			.map((result) => result.json())
			._finally(() => {
				this.loadingService.hide();
			})
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
		this.storage.clear();
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
