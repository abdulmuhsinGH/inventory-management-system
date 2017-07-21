import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'delete-product-modal',
  templateUrl: './app/product/delete-product-modal/delete-product-modal.component.html',
  providers: [ProductService, NotificationsService],
})


export class DeleteProductModalComponent{


	  /*Add new product Form Setup*/
	 deleteProductForm:FormGroup;
	 productIdFormControl:FormControl = new FormControl('', [Validators.required]);



	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 

	 @Input()
	 public  product:Product;

	 @Output()
	 public onDeleteProduct = new EventEmitter<boolean>();
	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private productService: ProductService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){

	 	 this.productIdFormControl.setValue(this.product.id);

	     this.deleteProductForm = new FormGroup({
	          productId: this.productIdFormControl,
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public deleteProduct(product:any) {
	  	console.log(product.productId);
      this.productService.deleteProduct(product.productId)
                    .subscribe(
                      status=>{
                      		   this.onDeleteProduct.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(product);

  }

}