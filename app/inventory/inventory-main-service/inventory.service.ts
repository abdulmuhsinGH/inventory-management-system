import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Inventory } from '../inventory-main-interface/inventory.interface';

@Injectable()


export class InventoryService {
	private inventoryURLAPI = 'http://localhost:5001/inventory/';

	constructor (private http: Http){

	}


	getInventoryList () : Observable<Inventory[]> {
			return this.http.get(this.inventoryURLAPI + 'view/')
							.map(this.extractData)
							.catch(this.handleError);
	}

	addInventory(body: Object):Observable<any> {

		let bodyString = JSON.stringify(body);
		 let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


		return this.http.post(this.inventoryURLAPI + 'add/', body, options)
								.map(this.extractResponse) 
								.catch(this.handleError);
	}

	search(term: string): Observable<Inventory[]> {
	    return this.http
	               .get(this.inventoryURLAPI+'search/?search-term='+term)
	               .map(this.extractData)
	               .catch(this.handleError);
	}



	private extractData(res: Response) {
		console.log(res.json().result);
	    let body = res.json();
	    return body.result as Observable<Inventory[]>;
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