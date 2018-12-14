import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Location from '../models/location.model';

@Injectable()
export class LocationService {
    constructor(private http: Http) { }

    getAll(): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + '/getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    getSince(start: Date): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + `/getSince?start=${start}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getBetweenDates(start: Date, end: Date): Observable<Location[]> {
        return this.http.get(ENV.BASE_URL + `/getBetweenDates?start=${start}&end=${end}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
