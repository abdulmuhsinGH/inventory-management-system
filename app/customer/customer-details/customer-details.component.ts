import { Component,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.interface';

@Component({
  /*selector: 'my-app',*/
  templateUrl: 'app/customer/customer-details/customer-details.component.html',
  providers:[CustomerService]
})


export class CustomerDetailsComponent { 

title = 'Customer Profile';
customerId:number;
customer:Customer;


@ViewChild('childModal') public childModal:ModalDirective;

 public constructor(private route: ActivatedRoute,
  private router: Router,private customerService:CustomerService){

 }


  ngOnInit(){


    this.getCustomerDetails();
  
  }
 
 public showChildModal():void {
	this.childModal.show();
 }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

   public getCustomerDetails(){
   	let errorMessage:string;

    console.log(this.route.snapshot.params);
       this.customerId = +this.route.snapshot.params['customerId'];
     // this.customer.id = customerId;
      console.log(this.customerId);
      this.customerService.getCustomerDetails(this.customerId)
                   .subscribe(
                     customer => {
                                   this.customer = customer,
                                   console.log(this.customer)
                                  },
                     error =>  errorMessage = <any>error);
  }
  public onChangeCustomerDetails(){
    this.getCustomerDetails();
  }

}
