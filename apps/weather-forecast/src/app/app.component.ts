import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from './core/store/app.state';
import { Store } from '@ngrx/store';
import { searchCityCoordinates, searchForecast } from './core/store/forecast/forecast.actions';
import { Observable, skip, Subject, takeUntil } from 'rxjs';
import { ISearchCityRes, ITableRow } from './core/store/forecast/forecast.model';
import {
	cityNotFoundSelectorSelector,
	dailyForecastDataSelector,
	hourlyForecastDataSelector,
	searchCityCoordinatesDataSelector,
	searchLoadingSelector,
} from './core/store/forecast/forecast.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TABLE_HOURLY_COLUMNS, TABLE_WEEK_DAYS_FROM_NOW } from './shared/shared.constants';
import { ITableData } from './shared/shared.models';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	searchCityCoordinates$!: Observable<ISearchCityRes>;
	isCityNotFound$!: Observable<boolean>;
	loading$!: Observable<boolean>;
	hourlyForecastData$!: Observable<ITableRow[]>;
	dailyForecastData$!: Observable<ITableRow[]>;
	searchFormGroup!: FormGroup;
	displayedColumns!: string[];
	dataSource!: Observable<ITableRow[]>;
	tableData!: ITableData;
	private _onDestroy$ = new Subject();

	constructor(
		private _store: Store<AppState>,
		private _fb: FormBuilder,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) {}

	get currentMode(): string {
		return this.searchFormGroup.get('mode')?.value;
	}

	ngOnInit(): void {
		this._buildSearchForm();
		this._getDataFromStore();
		this._searchCityCoordinateSub();
		this._onSearchFormChangesSub();
		this._setInitialLogic();
	}

	ngOnDestroy(): void {
		this._onDestroy$.next(true);
	}

	searchCity(searchWord: string): void {
		this._store.dispatch(searchCityCoordinates({ searchWord }));

		// update query params
		this._router.navigate(['.'], {
			relativeTo: this._activatedRoute,
			queryParams: { searchWord, mode: this.currentMode },
		});
	}

	private _getDataFromStore(): void {
		this.searchCityCoordinates$ = this._store.select(searchCityCoordinatesDataSelector).pipe(skip(1));
		this.loading$ = this._store.select(searchLoadingSelector);
		this.hourlyForecastData$ = this._store.select(hourlyForecastDataSelector);
		this.dailyForecastData$ = this._store.select(dailyForecastDataSelector);
		this.isCityNotFound$ = this._store.select(cityNotFoundSelectorSelector);
	}

	private _buildSearchForm(): void {
		this.searchFormGroup = this._fb.group({
			searchWord: this._fb.control('', Validators.required),
			mode: this._fb.control('hourly'),
		});
	}

	private _searchCityCoordinateSub(): void {
		this.searchCityCoordinates$.pipe(takeUntil(this._onDestroy$)).subscribe(searchCityCoordinates => {
			if (searchCityCoordinates) {
				const { lat, lon } = searchCityCoordinates;
				this._store.dispatch(searchForecast({ lat, lon }));
			}
		});
	}

	private _onSearchFormChangesSub(): void {
		this.searchFormGroup
			.get('mode')
			?.valueChanges.pipe(takeUntil(this._onDestroy$))
			.subscribe(mode => {
				this.dataSource = this.tableData[mode].data;
				this.displayedColumns = this.tableData[mode].displayedColumns;
			});
	}

	private _setInitialLogic(): void {
		this.tableData = {
			hourly: { data: this.hourlyForecastData$, displayedColumns: TABLE_HOURLY_COLUMNS },
			daily: {
				data: this.dailyForecastData$,
				displayedColumns: TABLE_WEEK_DAYS_FROM_NOW,
			},
		};
		this.dataSource = this.tableData[this.currentMode].data;
		this.displayedColumns = this.tableData[this.currentMode].displayedColumns;
	}
}
