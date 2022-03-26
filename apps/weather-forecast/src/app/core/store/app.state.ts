import { IForecastState } from './forecast/forecast.state';

export interface AppState {
	readonly forecast: IForecastState;
}
