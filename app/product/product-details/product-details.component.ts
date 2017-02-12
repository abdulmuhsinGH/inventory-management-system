import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service'; 
import { Product } from '../product.interface';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';


@Component({
  /*selector: 'my-dashboard',*/
  templateUrl: './app/product/product-details/product-details.component.html',
})

export class ProductDetailsComponent implements OnInit{ 


	title = 'Product Details';

  public constructor(private route: ActivatedRoute,
  private router: Router,private productService:ProductService){

  }

  ngOnInit(){

    /*this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.service.getHero(+params['id']))
    .subscribe((hero: Hero) => this.hero = hero);*/
  }



	@ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

}