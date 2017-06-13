import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductComponent }   from '../product/product.component';
import { ProductDetailsComponent }   from '../product/product-details/product-details.component';


const routes: Routes = [
   	
	{ path: 'product', component: ProductComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  
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



export class ProductRoutingModule {
}

export const routingComponents = [ProductComponent,ProductDetailsComponent ];
