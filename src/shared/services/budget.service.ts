import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Budget from '../models/budget.model';

@Injectable()
export class BudgetService {
    constructor(private http: Http) { }

    getById(id: number): Observable<Budget> {
        return this.http.get(ENV.BASE_URL + `/getById?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Budget[]> {
        return this.http.get(ENV.BASE_URL + '/getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(budget: Budget): Observable<Budget> {
        return this.http.post(ENV.BASE_URL + '/create', budget)
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(budget: Budget): Observable<Budget> {
        return this.http.put(ENV.BASE_URL + '/update', budget)
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + `/delete?id=${id}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
