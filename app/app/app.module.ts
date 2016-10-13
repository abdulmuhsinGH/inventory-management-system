import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent }   from './app.component';
import { AppRoutingModule,routingComponents } from './app.routing';


import { DashboardComponent }   from '../dashboard/dashboard.component';




@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  AppRoutingModule,
  				  

  				],
  declarations: [ AppComponent,
  				  DashboardComponent,
  				  routingComponents,
  				    ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { 


}
