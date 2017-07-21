import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'set-selling-price-modal',
  templateUrl: './app/product/set-selling-price-modal/set-selling-price-modal.component.html',
  providers: [ProductService, NotificationsService],
})


export class SetSellingPriceModalComponent{

	  /*Edit new product Form Setup*/
	 setSellingPriceForm:FormGroup;
	 
	 sellingPriceFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
	 productIdFormControl:FormControl = new FormControl('',[Validators.required] );
	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 @Input()
	 public productId:number;

	 @Output()
	 public onSettingSellingPrice = new EventEmitter<boolean>();

	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private productService: ProductService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){
	 	console.log(this.productId);
	 	this.productIdFormControl.setValue(this.productId)
	 	

	     this.setSellingPriceForm = new FormGroup({
	          current_selling_price:this.sellingPriceFormControl,
	          productId:this.productIdFormControl
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public setSellingPrice(product:any, isValid:boolean) {
	  	console.log(product)
      this.productService.setSellingPrice(product.productId,product)
                    .subscribe(
                      status=>{
                      		   this.onSettingSellingPrice.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(product, isValid);

  }

}