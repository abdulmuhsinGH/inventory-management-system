import { Component,ViewChild, OnInit } from '@angular/core';
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
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.interface';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'my-app',
  templateUrl: 'app/supplier/supplier.component.html',
  providers: [SupplierService],
})


export class SupplierComponent implements OnInit { 

title = 'Suppliers';
suppliers: Supplier[];
errorMessage:string;

private searchTerms = new Subject<string>();
public notificationsOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose:true
}


constructor( private supplierService:SupplierService, private angularNotificationService: NotificationsService){

}

ngOnInit(){
	this.getSuppliersList();

  this.searchTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time the term changes
            // return the http search observable
            ? this.supplierService.search(term)
            // or the observable of all products if there was no search term
            : Observable.of<Supplier[]>(this.suppliers))
          .subscribe(
                   suppliers => {
                                   this.suppliers = suppliers
                                   
                                  },
                    error =>  this.errorMessage = <any>error);

}

  public getSuppliersList() {
        this.supplierService.getSupplierList()
                   .subscribe(
                     suppliers =>this.suppliers = suppliers,
                     error =>  this.errorMessage = <any>error);
  }

  // Push a search term into the observable stream.
  public search(term: string): void {
    term +=" ";
    console.log(term);
    this.searchTerms.next(term);
  }

  public onChangeSupplierList(){
    this.getSuppliersList();
  }

}
