import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SupplierComponent }   from '../supplier/supplier.component';
import { SupplierDetailsComponent }   from '../supplier/supplier-details/supplier-details.component';


const routes: Routes = [
   	
	{ path: 'supplier', component: SupplierComponent },
  { path: 'supplier-details/:supplierId', component: SupplierDetailsComponent },
  
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



export class SupplierRoutingModule {
}

export const routingComponents = [SupplierComponent,SupplierDetailsComponent ];
