import { Component,ViewChild, OnInit } from '@angular/core';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.interface';


@Component({
  selector: 'my-app',
  templateUrl: 'app/supplier/supplier.component.html',
  providers: [SupplierService],
})


export class SupplierComponent implements OnInit { 

title = 'Suppliers';
suppliers: Supplier[];
errorMessage:string;

constructor( private supplierService:SupplierService){

}

ngOnInit(){
	this.getSuppliersList();
}

@ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

  public getSuppliersList() {
        this.supplierService.getSupplierList()
                   .subscribe(
                     suppliers =>this.suppliers = suppliers,
                     error =>  this.errorMessage = <any>error);
  }

}
