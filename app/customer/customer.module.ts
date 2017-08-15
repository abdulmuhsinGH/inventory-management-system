import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/


import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { TypeaheadModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {SimpleNotificationsModule} from 'angular2-notifications';



import { CustomerComponent }   from './customer.component';
import { CustomerDetailsComponent }   from './customer-details/customer-details.component';
import {AddCustomerComponent} from './add-customer-modal/add-customer-modal.component';
import {EditCustomerModalComponent} from './edit-customer-modal/edit-customer-modal.component';
import { CustomerRoutingModule,routingComponents } from './customer.routing';




@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            //ChartsModule,
            PaginationModule.forRoot(),
            ModalModule.forRoot(),
            TypeaheadModule.forRoot(),
            CustomerRoutingModule,
            SimpleNotificationsModule
            
  				],
  declarations: [
                CustomerComponent,
                CustomerDetailsComponent,
                AddCustomerComponent,
                EditCustomerModalComponent,
                routingComponents

  				    ]
})


export class CustomerModule { 


}
