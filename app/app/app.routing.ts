import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from '../dashboard/dashboard.component';



import { InventoryComponent }   from '../inventory/inventory.component';

import { CustomerComponent }   from '../customer/customer.component';

import { SupplierComponent }   from '../supplier/supplier.component';

import { SaleComponent }   from '../sale/sale.component';




const routes: Routes = [
   	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: 'dashboard', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'customer', component: CustomerComponent },
  
  { path: 'sale', component: SaleComponent },
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



export class AppRoutingModule {
}

export const routingComponents = [DashboardComponent];
