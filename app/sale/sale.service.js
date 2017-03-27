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
var SaleService = (function () {
    function SaleService(http) {
        this.http = http;
        this.saleURLAPI = 'http://localhost:5000/sale/';
    }
    SaleService.prototype.addSales = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.saleURLAPI + 'add/', body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    SaleService.prototype.getSalesList = function () {
        return this.http.get(this.saleURLAPI + 'view/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    SaleService.prototype.extractData = function (res) {
        console.log(res.json().message);
        var body = res.json();
        return body.result;
    };
    SaleService.prototype.extractResponse = function (res) {
        return res.json();
    };
    SaleService.prototype.handleError = function (error) {
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
    return SaleService;
}());
SaleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SaleService);
exports.SaleService = SaleService;
//# sourceMappingURL=sale.service.js.map