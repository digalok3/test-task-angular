import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	imports: [
		MatAutocompleteModule,
		MatTableModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatInputModule,
		MatRadioModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatIconModule,
	],
	exports: [
		MatAutocompleteModule,
		MatTableModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatInputModule,
		MatRadioModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatIconModule,
	],
	declarations: [],
})
export class MaterialImportsModule {}
