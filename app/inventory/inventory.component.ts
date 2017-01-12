import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
//import {Control} from '@angular/common';


import "../rxjs-extensions";

import { Observable } from 'rxjs/Observable';

 


/*import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';*/
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { InventoryService } from './inventory.service'; 
import { Inventory } from './inventory.interface';
import { SupplierService } from '../supplier/supplier.service'; 
import { Supplier } from '../supplier/supplier.interface';
import { InventoryRecords } from './inventory.interface';
import { Table } from '../other/table';
import { NotificationsService } from 'angular2-notifications';


@Component({
  /*selector: 'my-dashboard',*/
  templateUrl: './app/inventory/inventory.component.html',
  providers: [InventoryService, SupplierService]
})

export class InventoryComponent implements OnInit, OnChanges{ 

  title = 'Inventory';
  errorMessage:string;
  inventories: Inventory[];
  suppliers: Supplier[]
  inventory: Inventory;
  table:any;
  public notificationsOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose:true
}
     // supplierComponent:SupplierComponent
  /*Add new inventory Form Setup*/
  addInventoryForm:FormGroup;
  productNameFormControl:FormControl = new FormControl('', [Validators.required]);
  productIdFormControl:FormControl = new FormControl('', [Validators.required]);
  supplierNameFormControl:FormControl = new FormControl('', [Validators.required]);
  supplierIdFormControl:FormControl = new FormControl('', [Validators.required]);
  quantityFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
  totalCostFormControl:FormControl = new FormControl({value:0, disabled: true});
  costPriceFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
/*Add new inventory Form Setup*/

  @ViewChild('childModal') public childModal:ModalDirective;
  public constructor(private inventoryService: InventoryService, private supplierService:SupplierService, private angularNotificationService: NotificationsService ) {

    this.dataSource = Observable.create((observer:any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).mergeMap((token:string) => this.getProductAsObservable(token));

  }

  ngOnInit(){

     this.addInventoryForm = new FormGroup({
          name: this.productNameFormControl,
          product_id: this.productIdFormControl,
          supplier:this.supplierNameFormControl,
          supplier_id: this.supplierIdFormControl,
          quantity:this.quantityFormControl,
          total_cost:this.totalCostFormControl,
          cost_price:this.costPriceFormControl
      });
     
     this.getInventoryList();

     this.supplierService.getSupplierList()
                          .subscribe(
                             suppliers =>this.suppliers = suppliers,
                             error =>  this.errorMessage = <any>error);;
     //this.supplierComponent.suppliers;
     this.totalCostSubcribeToCostPriceChanges();
     this.totcalCostSubcribeToQuantityChanges();
     
  }

  ngOnChanges(changes: any){
    console.log('onChange fired');
    console.log(changes);

  }
  totalCostSubcribeToCostPriceChanges() {
      // initialize stream
      const costPriceValueChanges$ = this.costPriceFormControl.valueChanges;

      // subscribe to the stream 
      costPriceValueChanges$.subscribe(x => this.totalCostFormControl.setValue(x * this.quantityFormControl.value));
  }
  totcalCostSubcribeToQuantityChanges() {
    // initialize stream
      const quantityValueChanges$ = this.quantityFormControl.valueChanges;

      // subscribe to the stream 
      quantityValueChanges$.subscribe(x => this.totalCostFormControl.setValue(x * this.costPriceFormControl.value));
  }
 //configuration for table 
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Selling Price', className: ['office-header', 'text-success'], name: 'current_selling_price', sort: 'asc'},
    {title: 'Cost Price.', name: 'current_cost_price', sort: 'asc'},
    {title: 'Quantity Added', className: 'text-warning', name: 'quantity'},
    {title: 'Total Quantity', name: 'total_quantity'}
  ];

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering:{
                name: { filterString: '' }
              },
    className: ['table-striped', 'table-bordered']
  };
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }


  public customSelected:string = '';
  public groupSelected:string = '';
  public selected:string = '';
  public dataSource:Observable<any>;
  public asyncSelected:string = '';
  public typeAheadLoading:boolean = false;
  public typeAheadNoResults:boolean = false;
 
  public getProductAsObservable(token:string):Observable<any> {
    let query = new RegExp(token, 'ig');
     console.log(this.inventories);
    return Observable.of(
      this.inventories.filter((inventory:any) => {  
        return query.test(inventory.name);
      })
    );

  }
 
  public changeTypeAheadLoading(e:boolean):void {
    this.typeAheadLoading = e;
  }
 
  public changeTypeAheadNoResults(e:boolean):void {
    this.typeAheadNoResults = e;
  }
 
  public typeAheadOnSelectProduct(e:TypeaheadMatch):void {
    this.productIdFormControl.setValue(e.item.id);
    console.log('Selected value: ', e.item.id);
  }

  public typeAheadOnSelectSupplier(e:TypeaheadMatch):void {
    this.supplierIdFormControl.setValue(e.item.id);
    console.log('Selected value: ', e.item.id);
  }


  public getInventoryList() {
      this.inventoryService.getInventoryList()
                 .subscribe(
                   inventories => {
                                   this.inventories = inventories,
                                   this.table = new Table(this.config, inventories, this.columns)
                                  },
                   error =>  this.errorMessage = <any>error);
        
  }



  public saveInventory(inventory:Inventory, isValid:boolean) {
      this.inventoryService.addInventory(inventory)
                    .subscribe(
                      status=>{
                               this.getInventoryList(),
                               this.angularNotificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


      this.getInventoryList();

      console.log(inventory, isValid);

  }

}