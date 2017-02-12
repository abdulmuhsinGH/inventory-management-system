import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { InventoryComponent }   from '../inventory-main-component/inventory.component';
import { AddInventoryModalComponent }   from '../add-inventory-modal/add-inventory-modal.component';

const routes: Routes = [
   	
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/add', component: AddInventoryModalComponent },
  
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



export class InventoryRoutingModule {
}

export const routingComponents = [InventoryComponent];
