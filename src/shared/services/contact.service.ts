import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Contact from '../models/contact.model';

@Injectable()
export class ContactService {
    private apiUrl = ENV.BASE_URL + '/contacts/';

    constructor(private http: AuthHttp) { }

    getById(id: number): Observable<Contact> {
        return this.http.get(this.apiUrl + `getById?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Contact[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(contact: Contact): Observable<Contact> {
        return this.http.post(this.apiUrl + 'create', contact)
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(contact: Contact): Observable<Contact> {
        return this.http.put(this.apiUrl + 'update', contact)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(user_id: number, contact: string): Observable<boolean> {
        return this.http.delete(this.apiUrl + `delete?user=${user_id}&contact=${contact}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
