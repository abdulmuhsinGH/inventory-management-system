import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {Router} from '@angular/router';



import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { SalesTransactionLogs } from './sales-transaction-logs.interface';

import { SaleService } from './sale.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/sale/sale.component.html',
  providers:[SaleService]
})


export class SaleComponent { 

title = 'Sales';
public salesList:SalesTransactionLogs[];
public errorMessage:string;
 // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales'},
    
  ];


  public lineChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };

   public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
   
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // Formbuilder will be used to simplify syntax and validation
  constructor(private saleService:SaleService, private router:Router) { 

    

      
  }
  //initialize form
  ngOnInit(){
     
      this.getSalesList();
      
    console.log(this.salesList);
  }


  public formatJSONStringInSalesList(){

    for(let sale of this.salesList){
      sale.transaction_details = JSON.parse(sale.transaction_details);
      console.log(sale.transaction_details);
    }
  }

  public viewInvoice(sale:any){

    this.router.navigateByUrl("/sale-invoice?form-data="+JSON.stringify(sale));
  }

  public getSalesList(){

     this.saleService.getSalesList()
                   .subscribe(
                     salesList => {
                                   this.salesList = salesList,
                                   this.formatJSONStringInSalesList(); 
                                  },
                     error =>  this.errorMessage = <any>error);

    
       console.log(this.salesList);
        
  }

 


}
