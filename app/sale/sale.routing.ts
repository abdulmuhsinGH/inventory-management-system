import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SaleComponent }   from '../sale/sale.component';
import { SaleInvoiceComponent }   from '../sale/invoice/sale-invoice.component';


const routes: Routes = [
   	
	{ path: 'sale', component: SaleComponent },
  { path: 'sale-invoice', component: SaleInvoiceComponent },
  
 ];
 
 @NgModule({
  imports: [
    RouterModule.forRoot(routes
    )
  ],
  exports: [
    RouterModule
  ]
})



export class SaleRoutingModule {
}

export const routingComponents = [SaleComponent,SaleInvoiceComponent ];
