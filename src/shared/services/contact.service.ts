import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Contact from '../models/contact.model';

@Injectable()
export class ContactService {
	private apiURL = ENV.BASE_URL + '/contact';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	getById(id: number): Observable<Contact> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getById?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getAll(user: number): Observable<Contact[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + '/getAll?user=' + user, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	create(contact: Contact): Observable<Contact> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/create', contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	update(contact: Contact): Observable<Contact> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/update', contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	delete(user_id: number, contact: number): Observable<boolean> {
		this.loadingService.show();

		return this.http.get(this.apiURL + '/delete?user=' + user_id + '&contact=' + contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}
}
