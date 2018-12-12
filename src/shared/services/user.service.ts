import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import User from '../models/user.model';

@Injectable()
export class UserService {
    private apiUrl = ENV.BASE_URL + '/users/';

    constructor(private http: AuthHttp) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get(this.apiUrl + `getByEmail?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<User[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    checkCredentials(email: string, password: string): Observable<User> {
        return this.http.get(this.apiUrl + `authenticate?email=${email}&password=${password}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(user: User): Observable<User> {
        return this.http.post(this.apiUrl + 'create', user)
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(user: User): Observable<User> {
        return this.http.put(this.apiUrl + 'update', user)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete(this.apiUrl + `delete?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    upload(file: any, user: User): Observable<User> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', JSON.stringify(user));

        return this.http.post(this.apiUrl + 'upload', formData)
            .pipe(catchError(error => Observable.throw(error)));
    }

    resetPassword(email: string): Observable<any> {
        return this.http.get(this.apiUrl + `resetPassword?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
