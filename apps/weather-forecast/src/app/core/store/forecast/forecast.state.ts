import { HttpErrorResponse } from '@angular/common/http';
import { IForecast, ISearchCityRes } from './forecast.model';

export interface IForecastState {
	searchCityCoordinates: {
		data: ISearchCityRes[];
		error: HttpErrorResponse | null;
		loading: boolean;
		isCityNotFound: boolean;
	};
	searchForecast: {
		data: IForecast;
		error: HttpErrorResponse | null;
		loading: boolean;
	};
}
