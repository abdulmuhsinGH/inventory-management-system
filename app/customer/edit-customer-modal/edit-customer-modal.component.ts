import { NgModule, Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { ModalDirective } from   'ng2-bootstrap';
import { Customer } from '../customer.interface';
import { CustomerService } from '../customer.service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'edit-customer-modal',
  templateUrl: './app/customer/edit-customer-modal/edit-customer-modal.component.html',
})


export class EditCustomerModalComponent{
	  EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
	  /*Edit new customer Form Setup*/
	  editCustomerForm:FormGroup;
	  customerNameFormControl:FormControl = new FormControl('', [Validators.required]);
	 
	  emailAddressFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]);
	  
	  phoneNumberFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
	  
	  customerIdFormControl:FormControl = new FormControl('', [Validators.required]);

	 @ViewChild('childModal') 
	 public childModal:ModalDirective;

	 @Input()
	 public customer:Customer;

	 @Output()
	 public onEditCustomer = new EventEmitter<boolean>();

	 public notificationsOptions = {
	    position: ["top", "right"],
	    timeOut: 5000,
	    lastOnBottom: true,
	    clickToClose:true
	 }

	 public constructor(private customerService: CustomerService, private notificationService: NotificationsService){
      
  	 }


	 public ngOnInit(){

	 	this.customerIdFormControl.setValue(this.customer.id)
	 	this.customerNameFormControl.setValue(this.customer.name);
	 	this.emailAddressFormControl.setValue(this.customer.email);
	 	this.phoneNumberFormControl.setValue(this.customer.phone_number);

	     this.editCustomerForm = new FormGroup({
	          name: this.customerNameFormControl,
	          email:this.emailAddressFormControl,
	          phone_number:this.phoneNumberFormControl,
	          customerId:this.customerIdFormControl
	     });

      
  	 }

  	 public showChildModal():void {
	    this.childModal.show();
	 }
	 
	 public hideChildModal():void {
	    this.childModal.hide();
	 }

	  public editCustomer(customer:any, isValid:boolean) {
	  	console.log(customer)
      this.customerService.editCustomer(customer.customerId,customer)
                    .subscribe(
                      status=>{
                      		   this.onEditCustomer.emit(true),
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(customer, isValid);

  }

}