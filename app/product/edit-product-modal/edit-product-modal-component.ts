import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'edit-product-modal',
  templateUrl: './app/product/edit-product-modal/edit-product-modal-component.html',
})


export class EditProductModalComponent{

	  /*Edit new product Form Setup*/
	 editProductForm:FormGroup;
	 productNameFormControl:FormControl = new FormControl('', [Validators.required]);
	 measurementFormControl:FormControl = new FormControl('', [Validators.required]);
	 productIdFormControl:FormControl = new FormControl('', [Validators.required]);
	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 @Input()
	 public product:Product;

	 @Output()
	 public onEditProduct = new EventEmitter<boolean>();

	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private productService: ProductService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){

	 	this.productIdFormControl.setValue(this.product.id)
	 	this.productNameFormControl.setValue(this.product.name);
	 	this.measurementFormControl.setValue(this.product.unit_of_measurment);

	     this.editProductForm = new FormGroup({
	          name: this.productNameFormControl,
	          unit_of_measurment:this.measurementFormControl,
	          productId:this.productIdFormControl
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public editProduct(product:any, isValid:boolean) {
	  	console.log(product)
      this.productService.editProduct(product.productId,product)
                    .subscribe(
                      status=>{
                      		   this.onEditProduct.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(product, isValid);

  }

}