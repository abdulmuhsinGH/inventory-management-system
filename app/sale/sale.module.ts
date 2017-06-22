import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/


import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { TypeaheadModule } from 'ng2-bootstrap';

import { Ng2TableModule } from 'ng2-table/ng2-table';
<<<<<<< HEAD
import { ChartsModule } from 'ng2-charts';

=======
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {SimpleNotificationsModule} from 'angular2-notifications';
>>>>>>> recordsales


import { SaleComponent }   from './sale.component';
import { SaleInvoiceComponent }   from './invoice/sale-invoice.component';
import { RecordSaleModalComponent }   from './record-sale-modal/record-sale-modal.component';
import { SaleRoutingModule,routingComponents } from './sale.routing';




@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            ChartsModule,
            Ng2TableModule,
            PaginationModule,
            ModalModule,
            TypeaheadModule,
            SaleRoutingModule,
            SimpleNotificationsModule
            
  				],
  declarations: [
                SaleComponent,
                SaleInvoiceComponent,
                RecordSaleModalComponent,
                routingComponents

  				    ]
})


export class SaleModule { 


}
