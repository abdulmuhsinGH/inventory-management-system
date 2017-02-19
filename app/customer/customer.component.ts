import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import "../rxjs-extensions";
import { Observable } from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

 // Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { CustomerService } from './customer.service';
import { Customer } from './customer.interface';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'my-app',
  templateUrl: 'app/customer/customer.component.html',
  providers:[CustomerService],
})


export class CustomerComponent { 

title = 'Customers';
customers: Customer[];
errorMessage:string;
private searchTerms = new Subject<string>();

constructor( private customerService:CustomerService, private angularNotificationService: NotificationsService){

}

ngOnInit(){
	this.getCustomerList();

  this.searchTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time the term changes
            // return the http search observable
            ? this.customerService.search(term)
            // or the observable of all products if there was no search term
            : Observable.of<Customer[]>(this.customers))
          .subscribe(
                   customers => {
                                   this.customers = customers
                                   
                                  },
                    error =>  this.errorMessage = <any>error);

 
}

public getCustomerList() {
    this.customerService.getCustomerList()
               .subscribe(
                 customers =>this.customers = customers,
                 error =>  this.errorMessage = <any>error);
}

 // Push a search term into the observable stream.
  public search(term: string): void {
    term +=" ";
    console.log(term);
    this.searchTerms.next(term);
  }

 public onChangeCustomerList(){
    this.getCustomerList();
  }

}
