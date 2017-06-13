import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'add-product-modal',
  templateUrl: './app/product/add-product-modal/add-product-modal.component.html',
})


export class AddProductModalComponent{

	  /*Add new product Form Setup*/
	 addProductForm:FormGroup;
	 productNameFormControl:FormControl = new FormControl('', [Validators.required]);
	 
	 measurementFormControl:FormControl = new FormControl('', [Validators.required]);
	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 @Output()
	 public onAddProduct = new EventEmitter<boolean>();

	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private productService: ProductService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){

	     this.addProductForm = new FormGroup({
	          name: this.productNameFormControl,
	          unit_of_measurment:this.measurementFormControl
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public saveProduct(product:Product, isValid:boolean) {
      this.productService.addProduct(product)
                    .subscribe(
                      status=>{
                      		   this.onAddProduct.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(product, isValid);

  }

}