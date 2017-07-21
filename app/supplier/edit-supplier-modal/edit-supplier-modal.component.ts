import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Supplier } from '../supplier.interface';
import { SupplierService } from '../supplier.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'edit-supplier-modal',
  templateUrl: './app/supplier/edit-supplier-modal/edit-supplier-modal.component.html',
  providers:[NotificationsService]
})


export class EditSupplierModalComponent{
	  EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
	  /*Edit new supplier Form Setup*/
	  editSupplierForm:FormGroup;
	  supplierNameFormControl:FormControl = new FormControl('', [Validators.required]);
	 
	  emailAddressFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]);
	  
	  phoneNumberFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
	  
	  supplierIdFormControl:FormControl = new FormControl('', [Validators.required]);

	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 @Input()
	 public supplier:Supplier;

	 @Output()
	 public onEditSupplier = new EventEmitter<boolean>();

	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private supplierService: SupplierService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){

	 	this.supplierIdFormControl.setValue(this.supplier.id)
	 	this.supplierNameFormControl.setValue(this.supplier.name);
	 	this.emailAddressFormControl.setValue(this.supplier.email);
	 	this.phoneNumberFormControl.setValue(this.supplier.phone_number);

	     this.editSupplierForm = new FormGroup({
	          name: this.supplierNameFormControl,
	          email:this.emailAddressFormControl,
	          phone_number:this.phoneNumberFormControl,
	          supplierId:this.supplierIdFormControl
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public editSupplier(supplier:any, isValid:boolean) {
	  	console.log(supplier)
      this.supplierService.editSupplier(supplier.supplierId,supplier)
                    .subscribe(
                      status=>{
                      		   this.onEditSupplier.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(supplier, isValid);

  }

}