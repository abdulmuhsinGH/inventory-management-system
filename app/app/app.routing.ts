import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from '../dashboard/dashboard.component';
import { ProductComponent }   from '../product/product.component';




const routes: Routes = [
   	{ path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'product', component: ProductComponent }
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
