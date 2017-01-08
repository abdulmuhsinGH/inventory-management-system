import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';


import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { RecordSaleDatas } from './record-sale.interface';


@Component({
  selector: 'my-app',
  templateUrl: 'app/sale/sale.component.html',
})


export class SaleComponent { 

title = 'Sales';

@ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

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

  // record sale form model
  public recordSaleForm: FormGroup;

  // Formbuilder will be used to simplify syntax and validation
  constructor(private _formBuilder: FormBuilder) { 
      
  }
  //initialize form
  ngOnInit(){
      this.recordSaleForm = this._formBuilder.group({
        sales: this._formBuilder.array([
          this.initSaleForm(),
          ])
      });
      
  }

  initSaleForm() {
    return this._formBuilder.group({
            product: ['', Validators.required],
            quantity: ['', Validators.required],
            price: ['', Validators.required]
        });
  }

  addRecordSaleRow(){
    const control = <FormArray>this.recordSaleForm.controls['sales'];
    control.push(this.initSaleForm());

  }

  removeRecordSaleRow(rowNumber: number){
    const control = <FormArray>this.recordSaleForm.controls['sales'];
    control.removeAt(rowNumber);
  }

  recordSale(model: RecordSaleDatas){
    console.log(model);
  }


}
