import { IForecastState } from './forecast.state';
import { IForecast } from './forecast.model';

export const forecastInitState: IForecastState = {
	searchForecast: { data: {} as IForecast, error: null, loading: false },
	searchCityCoordinates: {
		data: [],
		error: null,
		loading: false,
		isCityNotFound: false,
	},
};
