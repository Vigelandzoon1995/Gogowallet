import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Transaction from '../models/transaction.model';

@Injectable()
export class TransactionService {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
    });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getById(id: number): Observable<Transaction> {
        return this.http.get(ENV.BASE_URL + '/getById?id=' + id, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getByUser(user: number): Observable<Transaction> {
        return this.http.get(ENV.BASE_URL + '/getByUser?id=' + user, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + '/getAll', { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getSince(start: Date): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + '/getSince?start=' + start, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getBetweenDates(start: Date, end: Date): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + '/getBetweenDates?start=' + start + '&end=' + end, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(transaction: Transaction): Observable<Transaction> {
        return this.http.post(ENV.BASE_URL + '/create', transaction, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + '/delete?id=' + id, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }
}
