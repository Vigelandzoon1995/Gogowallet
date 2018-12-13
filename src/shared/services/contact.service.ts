import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Contact from '../models/contact.model';

@Injectable()
export class ContactService {
    constructor(private http: Http) { }

    getById(id: number): Observable<Contact> {
        return this.http.get(ENV.BASE_URL + `/getById?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Contact[]> {
        return this.http.get(ENV.BASE_URL + '/getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(contact: Contact): Observable<Contact> {
        return this.http.post(ENV.BASE_URL + '/create', contact)
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(contact: Contact): Observable<Contact> {
        return this.http.put(ENV.BASE_URL + '/update', contact)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(user_id: number, contact: string): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + `/delete?user=${user_id}&contact=${contact}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
