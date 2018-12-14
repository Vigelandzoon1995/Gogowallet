import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Contact from '../models/contact.model';

@Injectable()
export class ContactService {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
    });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getById(id: number): Observable<Contact> {
        return this.http.get(ENV.BASE_URL + `/getById?id=${id}`, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Contact[]> {
        return this.http.get(ENV.BASE_URL + '/getAll', { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(contact: Contact): Observable<Contact> {
        return this.http.post(ENV.BASE_URL + '/create', contact, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(contact: Contact): Observable<Contact> {
        return this.http.put(ENV.BASE_URL + '/update', contact, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(user_id: number, contact: string): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + '/delete?user=' + user_id + '&contact=' + contact, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }
}
