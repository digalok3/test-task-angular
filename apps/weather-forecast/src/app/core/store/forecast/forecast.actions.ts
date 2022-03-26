import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IForecastRes, ISearchCityRes, ISearchForecastReq } from './forecast.model';

export enum ForecastActions {
	SearchCityCoordinates = '[FORECAST] Search city coordinates loading',
	SearchCityCoordinatesSuccess = '[FORECAST] Search city coordinates success',
	SearchCityCoordinatesError = '[FORECAST] Search city coordinates error',
	SearchForecast = '[FORECAST] Search forecast loading',
	SearchForecastSuccess = '[FORECAST] Search forecasts success',
	SearchForecastError = '[FORECAST] Search forecast error',
	CityNotFound = '[FORECAST] City not found',
}

export const searchCityCoordinates = createAction(
	ForecastActions.SearchCityCoordinates,
	props<{ searchWord: string }>()
);
export const searchCityCoordinatesSuccess = createAction(
	ForecastActions.SearchCityCoordinatesSuccess,
	props<{ data: ISearchCityRes[] }>()
);
export const searchCityCoordinatesError = createAction(
	ForecastActions.SearchCityCoordinatesError,
	props<{ error: HttpErrorResponse }>()
);

export const searchForecast = createAction(ForecastActions.SearchForecast, props<ISearchForecastReq>());
export const searchForecastSuccess = createAction(
	ForecastActions.SearchForecastSuccess,
	props<{ data: IForecastRes[] }>()
);
export const searchForecastError = createAction(
	ForecastActions.SearchForecastError,
	props<{ error: HttpErrorResponse }>()
);

export const cityNotFound = createAction(ForecastActions.CityNotFound);
