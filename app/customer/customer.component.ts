import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import "../rxjs-extensions";
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { CustomerService } from './customer.service';
import { Customer } from './customer.interface';


@Component({
  selector: 'my-app',
  templateUrl: 'app/customer/customer.component.html',
  providers:[CustomerService],
})


export class CustomerComponent { 

title = 'Customers';
customers: Customer[];
errorMessage:string;

EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

/*Add new customer Form Setup*/
  addCustomerForm:FormGroup;
  customerNameFormControl:FormControl = new FormControl('', [Validators.required]);
 
  emailAddressFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]);
  
  phoneNumberFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
/*Add new customer Form Setup*/

constructor( private customerService:CustomerService){

}

ngOnInit(){
	this.getCustomerList();

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

public getCustomerList() {
    this.customerService.getCustomerList()
               .subscribe(
                 customers =>this.customers = customers,
                 error =>  this.errorMessage = <any>error);
}

public saveCustomer(customer:Customer, isValid:boolean) {
      this.customerService.addCustomer(customer)
                    .subscribe(
                      status=>{console.log(status),
                               this.getCustomerList()
                               },
                      error => console.log(error));


     
      console.log(customer, isValid);

  }

}
