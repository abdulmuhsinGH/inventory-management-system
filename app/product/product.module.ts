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

import { ProductComponent }   from './product.component';
import { ProductDetailsComponent }   from './product-details/product-details.component';
import { AddProductModalComponent }   from './add-product-modal/add-product-modal.component';
import { DeleteProductModalComponent }   from './delete-product-modal/delete-product-modal.component';
import { EditProductModalComponent }   from './edit-product-modal/edit-product-modal-component';
import {SetSellingPriceModalComponent} from './set-selling-price-modal/set-selling-price-modal.component';
import {SetCostPriceModalComponent} from './set-cost-price-modal/set-cost-price-modal.component';
import { ProductRoutingModule,routingComponents } from './product.routing';




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
            ProductRoutingModule,
            SimpleNotificationsModule
            
  				],
  declarations: [
                ProductComponent,
                ProductDetailsComponent,
                AddProductModalComponent,
                DeleteProductModalComponent,
                EditProductModalComponent,
                SetSellingPriceModalComponent,
                SetCostPriceModalComponent,
                routingComponents

  				    ]
})


export class ProductModule { 


}
