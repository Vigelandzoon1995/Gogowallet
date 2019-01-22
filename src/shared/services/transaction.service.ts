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
	private apiURL = ENV.BASE_URL + '/transaction';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	getById(id: number): Observable<Transaction> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getById?id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getAll(bank_account: string): Observable<Transaction[]> {
		return this.http.get(this.apiURL + `/getByBankAccount?bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	getToday(bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getToday?bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getSince(date: string, bank_account: string): Observable<Transaction[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getSince?date=${date}&bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getBetweenDates(start: string, end: string, bank_account: string): Observable<Transaction[]> {
		return this.http.get(this.apiURL + `/getBetweenDates?start=${start}&end=${end}&bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
	}

	getLastTen(bank_account: string): Observable<Transaction[]> {
		return this.http.get(this.apiURL + `/getLastTen?bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json());
	}

	getSum(bank_account: string): Observable<number> {
		return this.http.get(this.apiURL + `/getSum?bank_account=${bank_account}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json().amount);
	}

	create(transaction: Transaction): Observable<Transaction> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/create', transaction, { headers: this.headers })
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
