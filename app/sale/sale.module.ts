//Angular Libraries
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Angular Libraries
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/

//Third Party Libraries
import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {SimpleNotificationsModule} from 'angular2-notifications';
//Third Party Libraries

//Custom Libraries
import { SaleComponent }   from './sale.component';
import { SaleInvoiceComponent }   from './invoice/sale-invoice.component';
import { RecordSaleModalComponent }   from './record-sale-modal/record-sale-modal.component';
import { SaleRoutingModule,routingComponents } from './sale.routing';
//Custom Libraries



@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            ChartsModule,
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
