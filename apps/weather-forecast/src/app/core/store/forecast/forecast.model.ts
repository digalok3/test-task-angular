export interface ISearchCityRes {
	lat: number;
	lon: number;
	name: string;
}

export interface ISearchForecastReq {
	lat: number;
	lon: number;
}

export interface IHourlyForecastRes {
	dt: number;
	temp: number;
}

export interface IDailyForecastRes {
	dt: number;
	temp: {
		day: number;
	};
}

export interface IForecastRes {
	hourly: IHourlyForecastRes[];
	daily: IDailyForecastRes[];
	city: string;
}

export interface ITableRow {
	[key: string]: string;
}

export interface IForecast {
	hourlyForecast: ITableRow[];
	dailyForecast: ITableRow[];
}
