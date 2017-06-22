import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';


import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { RecordSaleDatas } from './record-sale.interface';


@Component({
  selector: 'my-app',
  templateUrl: 'app/sale/sale.component.html',
})


export class SaleComponent { 

title = 'Sales';

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
  constructor() { 
      
  }
  //initialize form
  ngOnInit(){
     
      
  }

 


}
