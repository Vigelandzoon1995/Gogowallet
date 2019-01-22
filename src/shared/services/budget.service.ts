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

		return this.http.get(this.apiURL + `/getById?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getAll(user: number): Observable<Budget[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getAll?user_id=${user}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getActive(user: number): Observable<Budget[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getActive?user_id=${user}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getFinished(user: number): Observable<Budget[]> {
		return this.http.get(this.apiURL + `/getFinished?user_id=${user}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	getSum(): Observable<number> {
		return this.http.get(this.apiURL + `/getSum`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json().amount);
	}

	create(budget: Budget): Observable<Budget> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/create', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	update(budget: Budget): Observable<Budget> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/update', budget, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	delete(id: number): Observable<boolean> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/delete?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}
}
