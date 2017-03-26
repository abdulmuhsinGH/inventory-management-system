import { Component,ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import {RecordSaleModalComponent} from '../record-sale-modal/record-sale-modal.component';
import { SaleService } from '../sale.service';

import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'my-app',
  templateUrl: 'app/sale/invoice/sale-invoice.component.html',
  providers:[SaleService]
})


export class SaleInvoiceComponent implements OnInit { 

title = 'Invoice';


public recordSaleFormData:any;
public totalSalesAmountBeforeTax:number = 0;
public tax:number
public totalSalesAmountAftertax:number;

public currentDate = new Date();

public notificationsOptions = {
  position: ["top", "right"],
  timeOut: 5000,
  lastOnBottom: true,
  clickToClose:true
}

@ViewChild('childModal') public childModal:ModalDirective;



 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }


  @Input()
  public value:any;


  public constructor(private saleService:SaleService, private route:ActivatedRoute, private notificationService:NotificationsService){

  }
  public ngOnInit(){

  	this.recordSaleFormData = JSON.parse(this.route.snapshot.queryParams['form-data']);
    this.calculateTotalSales(this.recordSaleFormData.sales);
    this.calculateExtraCost();


  }

  public calculateTotalSales(salesData:any){

    for (let entry of salesData) {
       
        this.totalSalesAmountBeforeTax += (entry.price * entry.quantity); 
    }

  }

  public calculateExtraCost(){
    const taxRate = 0.093;

    this.tax = taxRate*this.totalSalesAmountBeforeTax;

    this.totalSalesAmountAftertax = this.tax + this.totalSalesAmountBeforeTax;

  }



  public saveInvoice(){

    let invoice = this.recordSaleFormData;
    invoice.total_sales_amount = this.totalSalesAmountBeforeTax;

    invoice.sales_type = 2;
    invoice.payment_type = 3;

    console.log(invoice);

    this.saleService.addSales(invoice)
                    .subscribe(
                      status=>{
                            
                               this.notificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


  }



}
