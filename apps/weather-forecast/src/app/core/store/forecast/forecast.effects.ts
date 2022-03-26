import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
	cityNotFound,
	searchCityCoordinates,
	searchCityCoordinatesError,
	searchCityCoordinatesSuccess,
	searchForecast,
	searchForecastError,
	searchForecastSuccess,
} from './forecast.actions';
import { ForecastService } from './forecast.service';
import { of, zip } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ForecastEffects {
	searchCityCoordinates$ = createEffect(() =>
		this._actions$.pipe(
			ofType(searchCityCoordinates),
			switchMap(({ searchWord }) =>
				this._forecastService.searchCityCoordinates(searchWord).pipe(
					map(data => {
						if (data?.length) {
							return searchCityCoordinatesSuccess({
								data,
							});
						}
						return cityNotFound();
					}),
					catchError(error => of(searchCityCoordinatesError(error)))
				)
			)
		)
	);

	searchForecast$ = createEffect(() =>
		this._actions$.pipe(
			ofType(searchForecast),
			switchMap(({ lat, lon }) =>
				zip([
					this._forecastService.searchForecastHourly(lat, lon),
					this._forecastService.searchForecastDaily(lat, lon),
				]).pipe(
					map(data =>
						searchForecastSuccess({
							data,
						})
					),
					catchError(error => of(searchForecastError(error)))
				)
			)
		)
	);

	constructor(private _actions$: Actions, private _forecastService: ForecastService) {}
}
