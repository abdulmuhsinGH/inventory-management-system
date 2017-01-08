/*Angular 2 modules*/
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/

/* Third party modules */
import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { TypeaheadModule } from 'ng2-bootstrap';
import { Ng2TableModule } from 'ng2-table/ng2-table';


import { InventoryRoutingModule,routingComponents } from './inventory.routing';
import { InventoryComponent }   from '../inventory/inventory.component';

@NgModule({
  imports:      [ 
  				  BrowserModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            CommonModule,
            Ng2TableModule,
            PaginationModule,
            ModalModule,
            TypeaheadModule,
            InventoryRoutingModule
           
            
  				],
  declarations: [             
            InventoryComponent,
            routingComponents
  				    ]
})


export class InventoryModule { 


}
