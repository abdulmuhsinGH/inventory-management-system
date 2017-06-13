import { Component,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';

import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier.interface';

@Component({
  /*selector: 'my-app',*/
  templateUrl: 'app/supplier/supplier-details/supplier-details.component.html',
  providers:[SupplierService]
})


export class SupplierDetailsComponent { 

title = 'Supplier Profile';
supplierId:number;
supplier:Supplier;


@ViewChild('childModal') public childModal:ModalDirective;

 public constructor(private route: ActivatedRoute,
  private router: Router,private supplierService:SupplierService){

 }


  ngOnInit(){


    this.getSupplierDetails();
  
  }
 
 public showChildModal():void {
	this.childModal.show();
 }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

   public getSupplierDetails(){
   	let errorMessage:string;

    console.log(this.route.snapshot.params);
       this.supplierId = +this.route.snapshot.params['supplierId'];
     // this.supplier.id = supplierId;
      console.log(this.supplierId);
      this.supplierService.getSupplierDetails(this.supplierId)
                   .subscribe(
                     supplier => {
                                   this.supplier = supplier,
                                   console.log(this.supplier)
                                  },
                     error =>  errorMessage = <any>error);
  }
  public onChangeSupplierDetails(){
    this.getSupplierDetails();
  }

}
