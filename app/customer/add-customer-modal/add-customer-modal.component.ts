import { NgModule, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import "../../rxjs-extensions";
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.interface';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'add-customer-modal',
  templateUrl: 'app/customer/add-customer-modal/add-customer-modal.component.html',
  providers:[CustomerService,NotificationsService],
})


export class AddCustomerComponent { 


customers: Customer[];
errorMessage:string;
public notificationsOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose:true
}

/*@Input()
public customer:Customer;*/

@Output()
   public onAddingNewCustomer = new EventEmitter<boolean>();

EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

/*Add new customer Form Setup*/
  addCustomerForm:FormGroup;
  customerNameFormControl:FormControl = new FormControl('', [Validators.required]);
 
  emailAddressFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]);
  
  phoneNumberFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
/*Add new customer Form Setup*/

constructor( private customerService:CustomerService, private angularNotificationService: NotificationsService){

}

ngOnInit(){
	

  this.addCustomerForm = new FormGroup({
          name: this.customerNameFormControl,
          email:this.emailAddressFormControl,
          phone_number:this.phoneNumberFormControl
      });
}

@ViewChild('childModal') public childModal:ModalDirective;
 
public showChildModal():void {
	this.childModal.show();
}

public hideChildModal():void {
	this.childModal.hide();
}

public saveCustomer(customer:Customer, isValid:boolean) {
      this.customerService.addCustomer(customer)
                    .subscribe(
                      status=>{
                               this.onAddingNewCustomer.emit(true),
                               this.angularNotificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(customer, isValid);

  }

}
