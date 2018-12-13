import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import User from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getById(id: number): Observable<User> {
        return this.http.get(ENV.BASE_URL + `/getById?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get(ENV.BASE_URL + `/getByEmail?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<User[]> {
        return this.http.get(ENV.BASE_URL + '/getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    checkCredentials(email: string, password: string): Observable<any> {
        return this.http.get(ENV.BASE_URL + `/login?email=${email}&password=${password}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    checkCredentialsByPin(email: string, pin: string): Observable<User> {
        return this.http.get(ENV.BASE_URL + `/authenticate?email=${email}&pin=${pin}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(user: User): Observable<User> {
        return this.http.post(ENV.BASE_URL + '/register', user)
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(user: User): Observable<User> {
        return this.http.put(ENV.BASE_URL + '/update', user)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + `/delete?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    upload(file: any, user: User): Observable<User> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', JSON.stringify(user));

        return this.http.post(ENV.BASE_URL + '/upload', formData)
            .pipe(catchError(error => Observable.throw(error)));
    }

    resetPassword(email: string): Observable<any> {
        return this.http.get(ENV.BASE_URL + `/resetPassword?email=${email}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
