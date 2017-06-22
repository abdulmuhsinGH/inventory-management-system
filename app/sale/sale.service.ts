import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

//import { Sale } from './sale.interface';

@Injectable()


export class SaleService {
	private saleURLAPI = 'http://localhost:5001/sale/';

	salesData:any;

	constructor (private http: Http){

	}



	public setSalesData(data:any){
		this.salesData = data;
	}



}