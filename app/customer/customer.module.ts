import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/


import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { TypeaheadModule } from 'ng2-bootstrap';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {SimpleNotificationsModule} from 'angular2-notifications';



import { CustomerComponent }   from './customer.component';
import { CustomerDetailsComponent }   from './customer-details/customer-details.component';
import { CustomerRoutingModule,routingComponents } from './customer.routing';




@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            ChartsModule,
            Ng2TableModule,
            PaginationModule.forRoot(),
            ModalModule.forRoot(),
            TypeaheadModule.forRoot(),
            CustomerRoutingModule,
            SimpleNotificationsModule
            
  				],
  declarations: [
                CustomerComponent,
                CustomerDetailsComponent,
                routingComponents

  				    ]
})


export class CustomerModule { 


}
