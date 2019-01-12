import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Location from '../models/location.model';

@Injectable()
export class LocationService {
	private apiURL = ENV.BASE_URL + '/gps';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
	}

	getAll(user: number): Observable<Location[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getAll?user_id=${user}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getLastLocation(user: number): Observable<Location> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getLast?user_id=${user}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	getBetweenDates(start: Date, end: Date): Observable<Location[]> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/getBetweenDates?start=${start}&end=${end}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}
}
