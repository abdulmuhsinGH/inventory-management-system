import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { ModalModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { MyDateRangePickerModule} from 'mydaterangepicker';

import { DashboardRoutingModule,routingDashboardComponents } from './dashboard.routing';

import { DashboardComponent }   from './dashboard.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		JsonpModule,
		DashboardRoutingModule,
		ModalModule,
		TabsModule.forRoot(),
		TypeaheadModule,
		ChartsModule,
		MyDateRangePickerModule

	],

	declarations:[
		DashboardComponent
	],

	bootstrap:[
		DashboardComponent,
		routingDashboardComponents,
	]

})


export class DashboardModule {

}