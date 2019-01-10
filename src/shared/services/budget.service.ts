import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Budget from '../models/budget.model';

@Injectable()
export class BudgetService {
	private apiURL = ENV.BASE_URL + '/budget';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService) {
		this.headers.append('Authorization', 'Bearer ' + authService.getToken());
	}

	getById(id: number): Observable<Budget> {
		return this.http.get(this.apiURL + '/getById?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getAll(): Observable<Budget[]> {
		return this.http.get(this.apiURL + '/getAll', { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	create(budget: Budget): Observable<Budget> {
		return this.http.post(this.apiURL + '/create', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	update(budget: Budget): Observable<Budget> {
		return this.http.put(this.apiURL + '/update', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	delete(id: number): Observable<boolean> {
		return this.http.delete(this.apiURL + '/delete?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}
}
