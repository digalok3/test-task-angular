import { fillWeekDaysFromNow } from '../core/store/forecast/forecast.functions';

export const WEEK_DAY_MAP: { [key: number]: string } = {
	0: 'Su',
	1: 'Mo',
	2: 'Tu',
	3: 'We',
	4: 'Th',
	5: 'Fr',
	6: 'St',
};
export const HOURS = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
export const TABLE_HOURS = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
export const TABLE_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'];
export const TABLE_WEEK_DAYS_FROM_NOW = ['City name', ...fillWeekDaysFromNow()];
export const TABLE_HOURLY_COLUMNS = ['City name', ...TABLE_HOURS];
