import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import Solenoid from '../models/solenoid.model';

@Injectable()
export class ContactService {
	private apiURL = ENV.BASE_URL + '/solenoid/status';

	private headers = new Headers({
		'Content-Type': 'application/json',
	});

	constructor(private http: Http, private authService: AuthenticationService, private loadingService: LoadingService) {
		this.authService.getToken().then((token) =>
			this.headers.append('Authorization', 'Bearer ' + token)
		);
    }

    getStatusById(id: number): Observable<Solenoid> {
		this.loadingService.show();

		return this.http.get(this.apiURL + `/get?device_id=${id}`, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}

	updateStatus(solenoid: Solenoid): Observable<Solenoid> {
		this.loadingService.show();

		return this.http.post(this.apiURL + '/set', solenoid, { headers: this.headers })
			.pipe(catchError(error => Observable.throw(error)))
			.map((res) => res.json())
			.finally(() => { this.loadingService.hide(); });
	}
}
