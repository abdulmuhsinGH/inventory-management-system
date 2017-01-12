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
var InventoryService = (function () {
    function InventoryService(http) {
        this.http = http;
        this.inventoryURLAPI = 'http://localhost:5000/inventory/';
    }
    InventoryService.prototype.getInventoryList = function () {
        return this.http.get(this.inventoryURLAPI + 'view/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    InventoryService.prototype.addInventory = function (body) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.inventoryURLAPI + 'add/', body, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    };
    InventoryService.prototype.extractData = function (res) {
        console.log(res.json().result);
        var body = res.json();
        return body.result;
    };
    InventoryService.prototype.extractResponse = function (res) {
        return res.json();
    };
    InventoryService.prototype.handleError = function (error) {
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
    return InventoryService;
}());
InventoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map