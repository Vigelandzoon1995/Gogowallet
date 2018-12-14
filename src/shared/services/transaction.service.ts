import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Transaction from '../models/transaction.model';

@Injectable()
export class TransactionService {
    constructor(private http: Http) { }

    getById(id: number): Observable<Transaction> {
        return this.http.get(ENV.BASE_URL + `/getById?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getByUser(user: number): Observable<Transaction> {
        return this.http.get(ENV.BASE_URL + `/getByUser?id=${user}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + '/getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    getSince(start: Date): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + `/getSince?start=${start}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getBetweenDates(start: Date, end: Date): Observable<Transaction[]> {
        return this.http.get(ENV.BASE_URL + `/getBetweenDates?start=${start}&end=${end}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(transaction: Transaction): Observable<Transaction> {
        return this.http.post(ENV.BASE_URL + '/create', transaction)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + `/delete?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
