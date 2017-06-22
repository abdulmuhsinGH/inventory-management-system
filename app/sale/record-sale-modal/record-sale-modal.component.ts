import { NgModule, Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';



import * as moment from 'moment';
import { ModalDirective } from   'ng2-bootstrap';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { RecordSaleDatas } from '../record-sale.interface';
import { SaleService } from '../sale.service';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../customer/customer.interface';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product.interface';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'record-sale-modal',
  templateUrl: 'app/sale/record-sale-modal/record-sale-modal.component.html',
  providers:[ProductService,CustomerService,SaleService,NotificationsService]
})


export class RecordSaleModalComponent implements OnInit { 

customers: Customer[];
products: Product[];
customSelected:string = '';
groupSelected:string = '';
selected:string = '';
dataSource:Observable<any>;
asyncSelected:string = '';
typeAheadLoading:boolean = false;
typeAheadNoResults:boolean = false;
errorMessage:string
recordsaleFormData:any;
notificationsOptions = {
  position: ["top", "right"],
  timeOut: 5000,
  lastOnBottom: true,
  clickToClose:true
}

@ViewChild('childModal')
public childModal:ModalDirective;

@Output()
public onChangeSalesList = new EventEmitter<boolean>();


  constructor(private _formBuilder: FormBuilder,private router:Router, private customerService: CustomerService, private productService: ProductService, private notificationService: NotificationsService) { 

      this.dataSource = Observable.create((observer:any) => {
        // Runs on every search
        observer.next(this.asyncSelected);
      }).mergeMap((token:string) => this.getProductAsObservable(token));
      
  }
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }
 customerNameFormControl:FormControl = new FormControl('', [Validators.required]);
 customerIdFormControl:FormControl = new FormControl('', [Validators.required]);
 productIdFormControl:FormControl = new FormControl('', [Validators.required]);
 productPriceFormControl:FormControl = new FormControl('', [Validators.required]);
   
  // record sale form model
  public recordSaleForm: FormGroup;

  //initialize form
  ngOnInit(){

      this.customerService.getCustomerList()
                          .subscribe(
                             customers =>this.customers = customers,
                             error =>  this.errorMessage = <any>error);

      this.productService.getProductList()
                          .subscribe(
                             products =>this.products = products,
                             error =>  this.errorMessage = <any>error);

      this.recordSaleForm = this._formBuilder.group({
        customer:this.customerNameFormControl,
        customerId:this.customerIdFormControl,
        
        sales: this._formBuilder.array([
          this.initSaleForm(),
          ])
      });
      
  }

  initSaleForm() {
    return this._formBuilder.group({
            product: ['', Validators.required],
            productId:this.productIdFormControl,
            quantity: ['', Validators.required],
            price: this.productPriceFormControl
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
    this.recordsaleFormData = model
    this.router.navigateByUrl("/sale-invoice?form-data="+JSON.stringify(model));
  }


   changeTypeAheadLoading(e:boolean):void {
       this.typeAheadLoading = e;
   }
 
     changeTypeAheadNoResults(e:boolean):void {
       this.typeAheadNoResults = e;
   }
 
   typeAheadOnSelectCustomer(e:TypeaheadMatch):void {
       this.customerIdFormControl.setValue(e.item.id);
       console.log('Selected value: ', e.item.id);
   }

   typeAheadOnSelectProduct(e:TypeaheadMatch):void {
       this.productIdFormControl.patchValue(e.item.id);
       this.productPriceFormControl.patchValue(e.item.current_selling_price);
       console.log('Selected value: ', e.item.current_selling_price);
   }

   getProductAsObservable(token:string):Observable<any> {
       let query = new RegExp(token, 'ig');
       console.log(this.products);
       return Observable.of(
        this.products.filter((inventory:any) => {  
          return query.test(inventory.name);
        })
       );

   }



}
