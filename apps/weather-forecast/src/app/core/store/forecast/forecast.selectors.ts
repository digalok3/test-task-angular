import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const searchCityCoordinatesLoadingSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchCityCoordinates.loading
);
export const searchForecastLoadingSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchForecast.loading
);

export const searchLoadingSelector = createSelector(
	searchCityCoordinatesLoadingSelector,
	searchForecastLoadingSelector,
	(searchCityLoading, searchForecastLoading) => searchCityLoading || searchForecastLoading
);

export const searchCityCoordinatesDataSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchCityCoordinates.data?.[0]
);

export const cityNotFoundSelectorSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchCityCoordinates.isCityNotFound
);

export const hourlyForecastDataSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchForecast.data.hourlyForecast
);
export const dailyForecastDataSelector = createSelector(
	(state: AppState) => state.forecast,
	state => state.searchForecast.data.dailyForecast
);
