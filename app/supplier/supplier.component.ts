import { Component,ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import "../rxjs-extensions";
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.interface';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'my-app',
  templateUrl: 'app/supplier/supplier.component.html',
  providers: [SupplierService],
})


export class SupplierComponent implements OnInit { 

title = 'Suppliers';
suppliers: Supplier[];
errorMessage:string;
public notificationsOptions = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose:true
}


/*Add new supplier Form Setup*/
  addSupplierForm:FormGroup;
  supplierNameFormControl:FormControl = new FormControl('', [Validators.required]);
 
  emailAddressFormControl:FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]);
  
  phoneNumberFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
/*Add new supplier Form Setup*/

constructor( private supplierService:SupplierService, private angularNotificationService: NotificationsService){

}

ngOnInit(){
	this.getSuppliersList();

   this.addSupplierForm = new FormGroup({
          name: this.supplierNameFormControl,
          email:this.emailAddressFormControl,
          phone_number:this.phoneNumberFormControl
      });
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

  public saveSupplier(supplier:Supplier, isValid:boolean) {
      this.supplierService.addSupplier(supplier)
                    .subscribe(
                      status=>{
                               this.getSuppliersList(),
                               this.angularNotificationService.success(status.state,status.message)
                               },
                      error => console.log(error));


     
      console.log(supplier, isValid);

  }

}
