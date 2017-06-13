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
import {SimpleNotificationsModule} from 'angular2-notifications';


import { InventoryRoutingModule,routingComponents } from './inventory-routing/inventory.routing';
import { InventoryComponent }   from './inventory-main-component/inventory.component';
import {AddInventoryModalComponent} from './add-inventory-modal/add-inventory-modal.component';

@NgModule({
  imports:      [ 
  				  BrowserModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            CommonModule,
            Ng2TableModule,
            PaginationModule,
            ModalModule.forRoot(),
            TypeaheadModule.forRoot(),
            InventoryRoutingModule,
            SimpleNotificationsModule
           
            
  				],
  declarations: [             
            InventoryComponent,
            AddInventoryModalComponent,
            routingComponents
  				    ]
})


export class InventoryModule { 


}
