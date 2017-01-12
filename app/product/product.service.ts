import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Product } from './product.interface';

@Injectable()


export class ProductService {
	private productURLAPI = 'http://localhost:5000/product/';

	constructor (private http: Http){

	}


	getProductList () : Observable<Product[]> {
			return this.http.get(this.productURLAPI + 'view/')
							.map(this.extractData)
							.catch(this.handleError);
	}

	addProduct(body: Object):Observable<Product[]> {

		let bodyString = JSON.stringify(body);
		 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.productURLAPI + 'add/', body, options)
								.map(this.extractData) 
								.catch(this.handleError);
	}

	private extractData(res: Response) {
		console.log(res.json().result);
    let body = res.json();
    return body.result as Product[];
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