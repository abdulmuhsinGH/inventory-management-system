import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from '../dashboard/dashboard.component';
import { ProductComponent }   from '../product/product.component';
import { InventoryComponent }   from '../inventory/inventory.component';




const routes: Routes = [
   	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'product', component: ProductComponent },
  { path: 'inventory', component: InventoryComponent }
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
