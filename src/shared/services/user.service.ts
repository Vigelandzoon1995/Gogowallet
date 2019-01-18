import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Preferences from '../models/preferences.model';
import User from '../models/user.model';

@Injectable()
export class UserService {
	private apiURL = ENV.BASE_URL + '/user';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	get(): Observable<User> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/get`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json()[0])
			.finally(() => { this.loadingService.hide(); });
	}


	getById(id: number): Observable<User> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getById?user_id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getPreferences(user_id: number): Observable<Preferences> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getPreferences?user_id=${user_id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	savePreferences(preferences: Preferences): Observable<boolean> {
		this.loadingService.show();

		return this.http.post(this.apiURL + `/savePreferences`, preferences, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getByEmail(email: string): Observable<User> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getByEmail?email=${email}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getAll(): Observable<User[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + '/getAll', { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	update(user: User): Observable<boolean> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/update', user, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	resetPassword(email: string): Observable<any> {
		return this.http.get(this.apiURL + `/resetPassword?email=${email}`)
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}
}
