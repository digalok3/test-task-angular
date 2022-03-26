import { ActionReducerMap } from '@ngrx/store';
import { forecastReducerModule } from './forecast/forecast.reducers';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
	forecast: forecastReducerModule,
};
