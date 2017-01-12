import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Customer } from './customer.interface';

@Injectable()


export class CustomerService {
	private customerURLAPI = 'http://localhost:5000/customer/';

	constructor (private http: Http){

	}


	getCustomerList () : Observable<Customer[]> {
			return this.http.get(this.customerURLAPI + 'view/')
							.map(this.extractData)
							.catch(this.handleError);
	}

	addCustomer(body: Object):Observable<any> {

		let bodyString = JSON.stringify(body);
		 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.customerURLAPI + 'add/', body, options)
								.map(this.extractResponse) 
								.catch(this.handleError);
	}

	private extractData(res: Response) {
		console.log(res.json().result);
	    let body = res.json();
	    return body.result as Customer[];
	}
	private extractResponse(res: Response) {
		
    	return res.json();
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