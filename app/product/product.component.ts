import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import "../rxjs-extensions";

import { Observable } from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

 // Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/*import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';*/
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { ProductService } from './product.service'; 
import { Product } from './product.interface';
import { Table } from '../other/table';
import { NotificationsService } from 'angular2-notifications'

@Component({
  /*selector: 'my-dashboard',*/
  templateUrl: './app/product/product.component.html',
  providers: [ProductService],
})

export class ProductComponent implements OnInit{ 


	title = 'Product';
  errorMessage:string;
  products: Product[];
  private searchTerms = new Subject<string>();

  
	@ViewChild('childModal') public childModal:ModalDirective;

  public constructor(private productService: ProductService, private angularNotificationService: NotificationsService){
      
  }

  ngOnInit(){

     this.getProductList();

     this.searchTerms
          .debounceTime(300)        // wait 300ms after each keystroke before considering the term
          .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => term   // switch to new observable each time the term changes
            // return the http search observable
            ? this.productService.search(term)
            // or the observable of all products if there was no search term
            : Observable.of<Product[]>(this.products))
          .subscribe(
                   products => {
                                   this.products = products
                                   
                                  },
                    error =>  this.errorMessage = <any>error);
      
  }
 


  public getProductList() {
        this.productService.getProductList()
                   .subscribe(
                     products => {
                                   this.products = products
                                  },
                     error =>  this.errorMessage = <any>error);
  }

  // Push a search term into the observable stream.
  public search(term: string): void {
    term +=" ";
    console.log(term);
    this.searchTerms.next(term);
  }

  public onChangeProductList(){
    this.getProductList();
  }

}