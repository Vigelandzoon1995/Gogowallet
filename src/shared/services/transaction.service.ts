import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Transaction from '../models/transaction.model';

@Injectable()
export class TransactionService {
	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	get(id: number): Observable<Transaction> {
		this.loadingService.show();

		return this.http.get(ENV.BASE_URL + '/getById?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getAll(bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(ENV.BASE_URL + '/getByBankAccount?account=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getOfToday(bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(ENV.BASE_URL + '/getToday?id=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getSince(start: Date, bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(ENV.BASE_URL + '/getSince?start=' + start + '&account=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	getBetweenDates(start: Date, end: Date, bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(ENV.BASE_URL + '/getBetweenDates?start=' + start + '&end=' + end + '&account=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	create(transaction: Transaction): Observable<Transaction> {
		this.loadingService.show();

		return this.http.post(ENV.BASE_URL + '/create', transaction, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}

	delete(id: number): Observable<boolean> {
		this.loadingService.show();

		return this.http.delete(ENV.BASE_URL + '/delete?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			._finally(() => {
				this.loadingService.hide()
			});
	}
}
