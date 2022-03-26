import { Action, createReducer, on } from '@ngrx/store';

import * as ForecastActions from './forecast.actions';
import { forecastInitState } from './forecast.init-state';
import { IForecastState } from './forecast.state';
import { processForecastApiData } from './forecast.functions';

const forecastReducer = createReducer(
	forecastInitState,
	on(ForecastActions.searchCityCoordinates, state => ({
		...state,
		searchCityCoordinates: {
			...state.searchCityCoordinates,
			loading: true,
			isCityNotFound: false,
		},
	})),
	on(ForecastActions.searchCityCoordinatesSuccess, (state, { data }) => ({
		...state,
		searchCityCoordinates: {
			...state.searchCityCoordinates,
			data,
			loading: false,
		},
	})),
	on(ForecastActions.searchCityCoordinatesError, (state, { error }) => ({
		...state,
		searchCityCoordinates: {
			...state.searchCityCoordinates,
			loading: false,
			error,
		},
	})),

	on(ForecastActions.searchForecast, state => ({
		...state,
		searchForecast: {
			...state.searchForecast,
			loading: true,
		},
	})),

	on(ForecastActions.searchForecastSuccess, (state, { data }) => ({
		...state,
		searchForecast: {
			...state.searchForecast,
			data: processForecastApiData(data, state.searchCityCoordinates.data[0].name),
			loading: false,
		},
	})),
	on(ForecastActions.searchForecastError, (state, { error }) => ({
		...state,
		searchForecast: {
			...state.searchForecast,
			loading: false,
			error,
		},
	})),
	on(ForecastActions.cityNotFound, state => ({
		...state,
		searchForecast: {
			...state.searchForecast,
			loading: false,
			data: { hourlyForecast: [], dailyForecast: [] },
		},
		searchCityCoordinates: {
			...state.searchCityCoordinates,
			data: [],
			loading: false,
			isCityNotFound: true,
		},
	}))
);

export const forecastReducerModule = (state: IForecastState | undefined, action: Action): IForecastState =>
	forecastReducer(state, action);
