"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
        this.customerURLAPI = 'http://localhost:5000/customer/';
    }
    CustomerService.prototype.getCustomerList = function () {
        return this.http.get(this.customerURLAPI + 'view/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.addCustomer = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.customerURLAPI + 'add/', body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    CustomerService.prototype.editCustomer = function (customerId, body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.customerURLAPI + 'update/' + customerId, body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    CustomerService.prototype.search = function (term) {
        return this.http
            .get(this.customerURLAPI + 'search/?search-term=' + term)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomerDetails = function (customerId) {
        return this.http.get(this.customerURLAPI + 'view/' + customerId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.extractData = function (res) {
        console.log(res.json().result);
        var body = res.json();
        return body.result;
    };
    CustomerService.prototype.extractResponse = function (res) {
        return res.json();
    };
    CustomerService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return CustomerService;
}());
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map