import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialImportsModule } from './shared/material-imports/material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBlockComponent } from './components/search-block/search-block.component';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AppComponent, SearchBlockComponent, TableComponent],
	imports: [
		BrowserModule,
		MaterialImportsModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		CoreModule,
		RouterModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
