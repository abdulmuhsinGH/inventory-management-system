import { Component,ViewChild } from '@angular/core';

import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalDirective } from   'ng2-bootstrap';

@Component({
  /*selector: 'my-app',*/
  templateUrl: 'app/customer/customer-details/customer-details.component.html',
})


export class CustomerDetailsComponent { 

title = 'Customer Profile';

@ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

}
