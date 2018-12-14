import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import { AuthenticationService } from '../helpers/auth.service';
import Location from '../models/location.model';

@Injectable()
export class LocationService {
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
    });

    constructor(private http: Http, private authService: AuthenticationService) { }

    getAll(): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + '/getAll', { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getSince(start: Date): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + '/getSince?start=' + start, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }

    getBetweenDates(start: Date, end: Date): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + '/getBetweenDates?start=' + start + '&end=' + end, { headers: this.headers })
            .pipe(catchError(error => Observable.throw(error)));
    }
}
