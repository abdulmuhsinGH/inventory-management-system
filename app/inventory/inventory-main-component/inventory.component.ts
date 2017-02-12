import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {Control} from '@angular/common';


import "../../rxjs-extensions";

import { Observable } from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

 // Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


/*import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';*/
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { InventoryService } from '../inventory-main-service/inventory.service'; 
import { Inventory } from '../inventory-main-interface/inventory.interface';
import { SupplierService } from '../../supplier/supplier.service'; 
import { Supplier } from '../../supplier/supplier.interface';
import { ProductService } from '../../product/product.service'; 
import { Product } from '../../product/product.interface';
import { InventoryRecords } from '../inventory-main-interface/inventory.interface';
import { Table } from '../../other/table';
import { NotificationsService } from 'angular2-notifications';


@Component({
  /*selector: 'my-dashboard',*/
  templateUrl: './app/inventory/inventory-main-component/inventory.component.html',
  providers: [InventoryService, SupplierService, ProductService]
})

export class InventoryComponent implements OnInit{ 

  title = 'Inventory';
  errorMessage:string;
  inventories: Inventory[];
  suppliers: Supplier[];
  products: Product[]
  inventory: Inventory;
  private searchTerms = new Subject<string>();
  

  public constructor(private inventoryService: InventoryService,private productService: ProductService, private supplierService:SupplierService, private angularNotificationService: NotificationsService ) {

  }

  ngOnInit(){

     this.getInventoryList();

     this.supplierService.getSupplierList()
                          .subscribe(
                             suppliers =>this.suppliers = suppliers,
                             error =>  this.errorMessage = <any>error);

      this.productService.getProductList()
                          .subscribe(
                             products =>this.products = products,
                             error =>  this.errorMessage = <any>error);

      this.searchTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time the term changes
            // return the http search observable
            ? this.inventoryService.search(term)
            // or the observable of all inventories if there was no search term
            : Observable.of<Inventory[]>(this.inventories))
          .subscribe(
                   inventories => {
                                   this.inventories = inventories
                                   
                                  },
                    error =>  this.errorMessage = <any>error);
     
  }

  public getInventoryList() {
      this.inventoryService.getInventoryList()
                 .subscribe(
                   inventories => {
                                   this.inventories = inventories
                                  },
                   error =>  this.errorMessage = <any>error);
        
  }

  // Push a search term into the observable stream.
  public search(term: string): void {
    term +=" ";
    console.log(term);
    this.searchTerms.next(term);
  }


  public onSaveInventory(){
    this.getInventoryList();
  }

}