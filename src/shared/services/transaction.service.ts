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
	});

	constructor(private http: Http, private authService: AuthenticationService) {
		this.headers.append('Authorization', 'Bearer ' + authService.getToken());
	}

	get(id: number): Observable<Transaction> {
		return this.http.get(ENV.BASE_URL + '/getById?id=' + id, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getAll(bank_account: string): Observable<Transaction[]> {
		return this.http.get(ENV.BASE_URL + '/getByBankAccount?account=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getOfToday(bank_account: string): Observable<Transaction[]> {
		return this.http.get(ENV.BASE_URL + '/getToday?id=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getSince(start: Date, bank_account: string): Observable<Transaction[]> {
		return this.http.get(ENV.BASE_URL + '/getSince?start=' + start + '&account=' + bank_account, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)));
	}

	getBetweenDates(start: Date, end: Date, bank_account: string): Observable<Transaction[]> {
		return this.http.get(ENV.BASE_URL + '/getBetweenDates?start=' + start + '&end=' + end + '&account=' + bank_account, { headers: this.headers })
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
