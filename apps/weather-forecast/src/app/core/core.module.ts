import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { ForecastEffects } from './store/forecast/forecast.effects';
import { reducers } from './store/main.reducers';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [],
	imports: [
		HttpClientModule,
		CommonModule,
		StoreModule.forRoot(reducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		EffectsModule.forRoot([ForecastEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
	],
})
export class CoreModule {}
