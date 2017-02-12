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
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.productURLAPI = 'http://localhost:5000/product/';
    }
    ProductService.prototype.getProductList = function () {
        return this.http.get(this.productURLAPI + 'view/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.addProduct = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.productURLAPI + 'add/', body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    ProductService.prototype.editProduct = function (productId, body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.productURLAPI + 'update/' + productId, body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (productId) {
        //let bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.productURLAPI + 'delete/' + productId, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    ProductService.prototype.search = function (term) {
        return this.http
            .get(this.productURLAPI + 'search/?search-term=' + term)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.extractData = function (res) {
        //console.log(res.json().message);
        var body = res.json();
        return body.result;
    };
    ProductService.prototype.extractResponse = function (res) {
        return res.json();
    };
    ProductService.prototype.handleError = function (error) {
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
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map