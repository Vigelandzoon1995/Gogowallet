import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Contact from '../models/contact.model';

@Injectable()
export class ContactService {
	private apiURL = ENV.BASE_URL + '/contact';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService) {
		this.headers.append('Authorization', 'Bearer ' + authService.getToken());
	}

	getById(id: number): Observable<Contact> {
		return this.http.get(this.apiURL + `/getById?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getAll(user: number): Observable<Contact[]> {
		return this.http.get(this.apiURL + '/getAll?user=' + user, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	create(contact: Contact): Observable<Contact> {
		return this.http.post(this.apiURL + '/create', contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	update(contact: Contact): Observable<Contact> {
		return this.http.post(this.apiURL + '/update', contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	delete(user_id: number, contact: number): Observable<boolean> {
		return this.http.get(this.apiURL + '/delete?user=' + user_id + '&contact=' + contact, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}
}
