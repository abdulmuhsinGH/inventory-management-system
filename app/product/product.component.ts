import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


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
  public productTable:any = Table;
  public notificationsOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose:true
}

  /*Add new product Form Setup*/
  addProductForm:FormGroup;
  productNameFormControl:FormControl = new FormControl('', [Validators.required]);
 
  measurementFormControl:FormControl = new FormControl('', [Validators.required]);
  
  //categoryFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);

/*Add new product Form Setup*/


  //configuration for table 
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Unit of Measurement', className: ['office-header', 'text-success'], name: 'unit_of_measurment', sort: 'asc'}
  ];

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering:{
                name: { filterString: '' }
              },
    className: ['table-striped', 'table-bordered']
  };

	@ViewChild('childModal') public childModal:ModalDirective;

  public constructor(private productService: ProductService, private angularNotificationService: NotificationsService){
      
  }

  ngOnInit(){
      this.productTable;
     this.getProductList();

      this.addProductForm = new FormGroup({
          name: this.productNameFormControl,
          unit_of_measurment:this.measurementFormControl
      });

      
  }
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }


  public getProductList() {
        this.productService.getProductList()
                   .subscribe(
                     products => {
                                   this.products = products,
                                   this.productTable = new Table(this.config, products, this.columns)
                                  },
                     error =>  this.errorMessage = <any>error);
  }

  public saveProduct(product:Product, isValid:boolean) {
      this.productService.addProduct(product)
                    .subscribe(
                      status=>{this.getProductList(),
                               this.angularNotificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(product, isValid);

  }

  addToast() {
        

        this.angularNotificationService.success(
        'Some Title',
        'Some Content')
        
    }

}