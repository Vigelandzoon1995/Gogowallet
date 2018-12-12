import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as ENV } from '../../environments/environment';
import Coordinate from '../models/coordinate';
import Location from '../models/location.model';

@Injectable()
export class LocationService {
    private apiUrl = ENV.BASE_URL + '/location/';

    constructor(private http: AuthHttp) { }

    getAll(): Observable<Location[]> {
        return this.http.get(this.apiUrl + 'getAll')
            .pipe(catchError(error => Observable.throw(error)));
    }

    getSince(start: Date): Observable<Location[]> {
        return this.http.get(this.apiUrl + `getSince?start=${start}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getBetweenDates(start: Date, end: Date): Observable<Location[]> {
        return this.http.get(this.apiUrl + `getBetweenDates?start=${start}&end=${end}`)
            .pipe(catchError(error => Observable.throw(error)));
    }

    getByLocation(coordinate: Coordinate): Observable<Location[]> {
        return this.http.get(this.apiUrl + `getByLocation?lat=${coordinate.latitude}&lon=${coordinate.longitude}`)
            .pipe(catchError(error => Observable.throw(error)));
    }
}
