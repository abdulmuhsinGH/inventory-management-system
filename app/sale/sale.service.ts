import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

//import { Sale } from './sale.interface';

@Injectable()


export class SaleService {
	private productURLAPI = 'http://localhost:5000/sale/';

	constructor (private http: Http){

	}