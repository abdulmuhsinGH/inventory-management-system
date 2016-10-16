import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';


import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';


@Component({
  /*selector: 'my-dashboard',*/
  templateUrl: './app/product/product.component.html',
})

export class ProductComponent{ 


	title = 'Product';

}