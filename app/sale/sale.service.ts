import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { SalesTransactionLogs } from './sales-transaction-logs.interface';

@Injectable()


export class SaleService {
	private saleURLAPI = 'http://localhost:5001/sale/';

	salesData:any;

	constructor (private http: Http){

	}



	public addSales(body:any){
		let bodyString = JSON.stringify(body);
		let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.saleURLAPI + 'add/', body, options)
								.map(this.extractResponse) 
								.catch(this.handleError);

	}

	public getSalesList() : Observable<SalesTransactionLogs[]> {
			return this.http.get(this.saleURLAPI + 'view/')
							.map(this.extractData)
							.catch(this.handleError);
	}


	private extractData(res: Response) {
		console.log(res.json().message);
    let body = res.json();
    return body.result as SalesTransactionLogs[];
	}

	private extractResponse(res: Response) {
	
       return res.json() ;
	}

	private handleError (error: Response | any) {
	    let errMsg: string;
	    if (error instanceof Response) {
	      const body = error.json() || '';
	      const err = body.error || JSON.stringify(body);
	      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } else {
	      errMsg = error.message ? error.message : error.toString();
	    }
	    console.error(errMsg);
	    return Observable.throw(errMsg);
	}



}