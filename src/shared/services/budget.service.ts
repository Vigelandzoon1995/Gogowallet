import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Budget from '../models/budget.model';

@Injectable()
export class BudgetService {
    private headers = new Headers({
        'Content-Type': 'application/json',
    });

    constructor(private http: Http) { }

    getById(id: number): Observable<Budget> {
        return this.http.get(ENV.BASE_URL + '/getById?id=' + id, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getAll(): Observable<Budget[]> {
        return this.http.get(ENV.BASE_URL + '/getAll', { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    create(budget: Budget): Observable<Budget> {
        return this.http.post(ENV.BASE_URL + '/create', budget, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    update(budget: Budget): Observable<Budget> {
        return this.http.put(ENV.BASE_URL + '/update', budget, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(ENV.BASE_URL + '/delete?id=' + id, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }
}
