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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var SupplierService = (function () {
    function SupplierService(http) {
        this.http = http;
        this.supplierURLAPI = 'http://localhost:5001/supplier/';
    }
    SupplierService.prototype.getSupplierList = function () {
        return this.http.get(this.supplierURLAPI + 'view/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    SupplierService.prototype.addSupplier = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.supplierURLAPI + 'add/', body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    SupplierService.prototype.editSupplier = function (customerId, body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(this.supplierURLAPI + 'update/' + customerId, body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    SupplierService.prototype.search = function (term) {
        return this.http
            .get(this.supplierURLAPI + 'search/?search-term=' + term)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SupplierService.prototype.getSupplierDetails = function (supplierId) {
        return this.http.get(this.supplierURLAPI + 'view/' + supplierId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SupplierService.prototype.extractData = function (res) {
        console.log(res.json().result);
        var body = res.json();
        return body.result;
    };
    SupplierService.prototype.extractResponse = function (res) {
        return res.json();
    };
    SupplierService.prototype.handleError = function (error) {
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
    return SupplierService;
}());
SupplierService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SupplierService);
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map