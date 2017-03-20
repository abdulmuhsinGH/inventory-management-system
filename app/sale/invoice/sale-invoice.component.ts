import { Component,ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import {RecordSaleModalComponent} from '../record-sale-modal/record-sale-modal.component';
import { SaleService } from '../sale.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/sale/invoice/sale-invoice.component.html',
  providers:[SaleService]
})


export class SaleInvoiceComponent implements OnInit { 

title = 'Invoice';
public recordSaleFormData:any;

@ViewChild('childModal') public childModal:ModalDirective;



 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }


  @Input()
  public value:any;


  public constructor(private saleService:SaleService, private route:ActivatedRoute){

  }
  public ngOnInit(){


  	console.log(this.route.snapshot.queryParams);
  	this.recordSaleFormData = JSON.parse(this.route.snapshot.queryParams['form-data']);

  	console.log(this.recordSaleFormData);



  }



}
