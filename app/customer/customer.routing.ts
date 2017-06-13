import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustomerComponent }   from '../customer/customer.component';
import { CustomerDetailsComponent }   from '../customer/customer-details/customer-details.component';


const routes: Routes = [
   	
	{ path: 'customer', component: CustomerComponent },
  { path: 'customer-details/:customerId', component: CustomerDetailsComponent },
  
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



export class CustomerRoutingModule {
}

export const routingComponents = [CustomerComponent,CustomerDetailsComponent ];
