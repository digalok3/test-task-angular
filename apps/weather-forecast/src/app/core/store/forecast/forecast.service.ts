import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForecastRes, ISearchCityRes } from './forecast.model';

@Injectable({
	providedIn: 'root',
})
export class ForecastService {
	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private _searchForecastStartUrl = 'https://api.openweathermap.org/data/2.5/onecall?';

	constructor(private _http: HttpClient) {}

	searchCityCoordinates(name: string): Observable<ISearchCityRes[]> {
		const url = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${this._apiKey}`;
		return this._http.get<ISearchCityRes[]>(url);
	}

	searchForecastHourly(lat: number, lon: number): Observable<IForecastRes> {
		const url = `${this._searchForecastStartUrl}lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${this._apiKey}`;
		return this._http.get<IForecastRes>(url);
	}

	searchForecastDaily(lat: number, lon: number): Observable<IForecastRes> {
		const url = `${this._searchForecastStartUrl}lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this._apiKey}`;
		return this._http.get<IForecastRes>(url);
	}
}
