import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';


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

constructor( private customerService:CustomerService){

}

ngOnInit(){
	this.getCustomerList();
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

}
