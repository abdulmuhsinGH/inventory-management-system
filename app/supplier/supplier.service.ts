import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Supplier } from './supplier.interface';

@Injectable()


export class SupplierService {
	private supplierURLAPI = 'http://localhost:5000/supplier/';

	constructor (private http: Http){

	}


	getSupplierList () : Observable<Supplier[]> {
			return this.http.get(this.supplierURLAPI + 'view/')
							.map(this.extractData)
							.catch(this.handleError);
	}

	addSupplier(body: Object):Observable<Supplier[]> {

		let bodyString = JSON.stringify(body);
		 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.supplierURLAPI + 'add/', body, options)
								.map(this.extractData) 
								.catch(this.handleError);
	}

	private extractData(res: Response) {
		console.log(res.json().result);
    let body = res.json();
    return body.result as Supplier[];
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