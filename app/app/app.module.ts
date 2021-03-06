import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/


import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { TypeaheadModule } from 'ng2-bootstrap';

import { ChartsModule } from 'ng2-charts';

import { AppComponent }   from './app.component';
import { AppRoutingModule,routingComponents } from './app.routing';


//import { DashboardComponent }   from '../dashboard/dashboard.component';
import { FinancialReportComponent }   from '../financial-report/financial-report.component';

import { ProductModule }   from '../product/product.module';
import { InventoryModule }   from '../inventory/inventory.module';
import { CustomerModule }   from '../customer/customer.module';
import { SupplierModule }   from '../supplier/supplier.module';
import { SaleModule }   from '../sale/sale.module';
import { DashboardModule} from '../dashboard/dashboard.module';






@NgModule({
  imports:      [ 
  				  BrowserModule,
            FormsModule,
            HttpModule,
            /*JsonpModule,*/
  				  AppRoutingModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            ChartsModule,
            PaginationModule.forRoot(),
            ModalModule,
            TypeaheadModule,
            ProductModule,
            SupplierModule,
            CustomerModule,
            SaleModule,
            InventoryModule,
            DashboardModule,
            TabsModule.forRoot(),
           
            
  				],
  declarations: [ AppComponent,
            FinancialReportComponent,
  				  routingComponents,            
            
            
            
  				    ],
  bootstrap:    [ AppComponent ]
})


export class AppModule { 


}
