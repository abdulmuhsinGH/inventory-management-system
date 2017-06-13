import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { InventoryService } from '../inventory-main-service/inventory.service'; 
import { Inventory } from '../inventory-main-interface/inventory.interface';
import { Supplier } from '../../supplier/supplier.interface';
import { Product } from '../../product/product.interface';
import { InventoryRecords } from '../inventory-main-interface/inventory.interface';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'add-inventory-modal',
  templateUrl: './app/inventory/add-inventory-modal/add-inventory-modal.component.html',
})


export class AddInventoryModalComponent{

	 errorMessage:string;
  	// inventories: Inventory[];
  	 //suppliers: Supplier[]
  	 inventory: Inventory;

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

	 customSelected:string = '';
	 groupSelected:string = '';
	 selected:string = '';
	 dataSource:Observable<any>;
	 asyncSelected:string = '';
	 typeAheadLoading:boolean = false;
	 typeAheadNoResults:boolean = false;
	 notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 @Input('suppliers') suppliers: Supplier[];
	 @Input('products') products: Product[];
	 @Output() onInventoryAdd = new EventEmitter<boolean>();


  	 @ViewChild('childModal') 
  	 public childModal:ModalDirective;


	 public constructor(private inventoryService: InventoryService, private notificationService: NotificationsService) {

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
	    
	     this.totalCostSubcribeToCostPriceChanges();
	     this.totcalCostSubcribeToQuantityChanges();
     
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

	 showChildModal():void {
	     this.childModal.show();
	 }
	 
	 hideChildModal():void {
	     this.childModal.hide();
	 }

	 getProductAsObservable(token:string):Observable<any> {
	     let query = new RegExp(token, 'ig');
	     console.log(this.products);
	     return Observable.of(
	      this.products.filter((inventory:any) => {  
	        return query.test(inventory.name);
	      })
	     );

	 }
 
	 changeTypeAheadLoading(e:boolean):void {
	     this.typeAheadLoading = e;
	 }
 
  	 changeTypeAheadNoResults(e:boolean):void {
	     this.typeAheadNoResults = e;
	 }
 
	 typeAheadOnSelectProduct(e:TypeaheadMatch):void {
	     this.productIdFormControl.setValue(e.item.id);
	     console.log('Selected value: ', e.item.id);
	 }

	 typeAheadOnSelectSupplier(e:TypeaheadMatch):void {
	     this.supplierIdFormControl.setValue(e.item.id);
	     console.log('Selected value: ', e.item.id);
	 }

	 saveInventory(inventory:Inventory, isValid:boolean) {
	      this.inventoryService.addInventory(inventory)
	                    .subscribe(
	                      status=>{
	                      		   this.onInventoryAdd.emit(true),
	                               this.notificationService.success(status.state,status.message)
	                               },
	                      error => console.log(error));

	      console.log(inventory, isValid);

	 }

}