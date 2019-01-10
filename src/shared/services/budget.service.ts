import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Budget from '../models/budget.model';

@Injectable()
export class BudgetService {
	private apiURL = ENV.BASE_URL + '/budget';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	getById(id: number): Observable<Budget> {
		this.loadingService.show();

		return this.http.get(this.apiURL + '/getById?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getAll(): Observable<Budget[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + '/getAll', { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	create(budget: Budget): Observable<Budget> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/create', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	update(budget: Budget): Observable<Budget> {
		this.loadingService.show();

		return this.http.put(this.apiURL + '/update', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	delete(id: number): Observable<boolean> {
		this.loadingService.show();

		return this.http.delete(this.apiURL + '/delete?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}
}
