import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import User from '../models/user.model';

@Injectable()
export class UserService {
    private headers = new Headers({
        'Content-Type': 'application/json',
    });

    constructor(private http: Http, private authService: AuthenticationService) {
        this.authService.getToken().then((token) =>
            this.headers.append('Authorization', 'Bearer ' + token)
        );
    }

    getById(id: number): Observable<User> {
        return this.http.get(ENV.BASE_URL + '/getById?id=' + id, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get(ENV.BASE_URL + '/getByEmail?email=' + email, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<User[]> {
        return this.http.get(ENV.BASE_URL + '/getAll', { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    checkCredentialsByPin(email: string, pin: string): Observable<User> {
        return this.http.post(ENV.BASE_URL + '/loginByPin', { email: email, pin: pin })
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(user: User): Observable<boolean> {
        return this.http.put(ENV.BASE_URL + '/users', user, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(email: string): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + '/delete?email=' + email, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    resetPassword(email: string): Observable<any> {
        return this.http.get(ENV.BASE_URL + '/resetPassword?email=' + email)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
