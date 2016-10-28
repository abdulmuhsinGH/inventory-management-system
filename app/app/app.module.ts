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

import { AppComponent }   from './app.component';
import { AppRoutingModule,routingComponents } from './app.routing';


import { DashboardComponent }   from '../dashboard/dashboard.component';
import { ProductComponent }   from '../product/product.component';
import { InventoryComponent }   from '../inventory/inventory.component';
import { CustomerComponent }   from '../customer/customer.component';
import { SupplierComponent }   from '../supplier/supplier.component';
import { SaleComponent }   from '../sale/sale.component';





@NgModule({
  imports:      [ 
  				  BrowserModule,
  				  AppRoutingModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            ChartsModule,
            Ng2TableModule,
            PaginationModule,
            ModalModule,
            TypeaheadModule
            
  				],
  declarations: [ AppComponent,
  				  DashboardComponent,
  				  routingComponents,
            ProductComponent,
            InventoryComponent,
            CustomerComponent,
            SupplierComponent,
            SaleComponent,
            
  				    ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { 


}
