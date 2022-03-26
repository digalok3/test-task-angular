import { IForecast, IForecastRes, ITableRow } from './forecast.model';
import { HOURS, WEEK_DAY_MAP } from '../../../shared/shared.constants';

export const processForecastApiData = (data: IForecastRes[], city: string): IForecast => {
	const [hourlyForecast, dailyForecast] = data;
	return {
		hourlyForecast: processHourlyApiData(hourlyForecast, city),
		dailyForecast: processDailyApiData(dailyForecast, city),
	};
};

const convertUnixToHhMm = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const hours = date.getHours();
	const min = ('0' + date.getMinutes()).slice(-2);
	return `${hours >= 10 ? hours : '0' + hours}:${min}`;
};

const getWeekDayFromUnixTime = (timestamp: number) => {
	const date = new Date(timestamp * 1000).getDay();
	return WEEK_DAY_MAP[date];
};

export const fillWeekDaysFromNow = () => {
	const weekDays = [];
	const currentDay = new Date().getDay();
	// fill array with days of the current week
	for (let i = currentDay; i < 7; i++) {
		weekDays.push(i);
	}
	// fill array with days in next week
	if (weekDays.length < 7) {
		const weekDaysLength = weekDays.length;
		for (let i = 0; i < 7 - weekDaysLength; i++) {
			weekDays.push(i);
		}
	}
	return weekDays.map(v => WEEK_DAY_MAP[v]);
};

export const processHourlyApiData = (hourlyForecast: IForecastRes, city: string): ITableRow[] => {
	let processHourlyDataArray = [];
	const processedHourlyData: { [key: string]: string } = { 'City name': city };
	for (const { dt, temp } of hourlyForecast.hourly) {
		const timeInHhMm = convertUnixToHhMm(dt);
		if (HOURS.includes(timeInHhMm)) {
			processHourlyDataArray.push({ time: timeInHhMm, temp: `${Math.round(temp)}°` });
		}
	}
	const indexOfThreeAm = processHourlyDataArray.findIndex(({ time }) => time === '03:00');
	const indexOf24pm = indexOfThreeAm + 8;
	// slice array in required time range
	processHourlyDataArray = processHourlyDataArray.slice(indexOfThreeAm, indexOf24pm);

	// replace 00:00 with 24:00 accordingly to UI task
	processHourlyDataArray[processHourlyDataArray.length - 1].time = '24:00';

	processHourlyDataArray.forEach(({ time, temp }) => {
		processedHourlyData[time] = temp;
	});
	return [processedHourlyData];
};

export const processDailyApiData = (dailyForecast: IForecastRes, city: string): ITableRow[] => {
	const processedDailyData: { [key: string]: string } = { 'City name': city };
	for (const { dt, temp } of dailyForecast.daily.slice(0, -1)) {
		const weekDay = getWeekDayFromUnixTime(dt);
		processedDailyData[weekDay] = `${Math.round(temp.day)}°`;
	}
	return [processedDailyData];
};
