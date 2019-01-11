import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
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

	getById(id: number): Observable<User> {
		return this.http.get(this.apiURL + `/getById?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	getByEmail(email: string): Observable<User> {
		return this.http.get(this.apiURL + `/getByEmail?email=${email}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	getAll(): Observable<User[]> {
		return this.http.get(this.apiURL + '/getAll', { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	update(user: User): Observable<boolean> {
		return this.http.post(this.apiURL + '/update', user, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	resetPassword(email: string): Observable<any> {
		return this.http.get(this.apiURL + `/resetPassword?email=${email}`)
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}
}
