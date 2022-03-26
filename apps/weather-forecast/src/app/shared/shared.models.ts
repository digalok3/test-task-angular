import { Observable } from 'rxjs';
import { ITableRow } from '../core/store/forecast/forecast.model';

export interface ITableData {
	[key: string]: {
		data: Observable<ITableRow[]>;
		displayedColumns: string[];
	};
}
