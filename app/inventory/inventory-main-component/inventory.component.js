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
//import {Control} from '@angular/common';
require("../../rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var inventory_service_1 = require("../inventory-main-service/inventory.service");
var supplier_service_1 = require("../../supplier/supplier.service");
var product_service_1 = require("../../product/product.service");
var angular2_notifications_1 = require("angular2-notifications");
var InventoryComponent = (function () {
    function InventoryComponent(inventoryService, productService, supplierService, angularNotificationService) {
        this.inventoryService = inventoryService;
        this.productService = productService;
        this.supplierService = supplierService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Inventory';
        this.searchTerms = new Subject_1.Subject();
    }
    InventoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInventoryList();
        this.supplierService.getSupplierList()
            .subscribe(function (suppliers) { return _this.suppliers = suppliers; }, function (error) { return _this.errorMessage = error; });
        this.productService.getProductList()
            .subscribe(function (products) { return _this.products = products; }, function (error) { return _this.errorMessage = error; });
        this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.inventoryService.search(term)
            : Observable_1.Observable.of(_this.inventories); })
            .subscribe(function (inventories) {
            _this.inventories = inventories;
        }, function (error) { return _this.errorMessage = error; });
    };
    InventoryComponent.prototype.getInventoryList = function () {
        var _this = this;
        this.inventoryService.getInventoryList()
            .subscribe(function (inventories) {
            _this.inventories = inventories;
        }, function (error) { return _this.errorMessage = error; });
    };
    // Push a search term into the observable stream.
    InventoryComponent.prototype.search = function (term) {
        term += " ";
        console.log(term);
        this.searchTerms.next(term);
    };
    InventoryComponent.prototype.onSaveInventory = function () {
        this.getInventoryList();
    };
    return InventoryComponent;
}());
InventoryComponent = __decorate([
    core_1.Component({
        /*selector: 'my-dashboard',*/
        templateUrl: './app/inventory/inventory-main-component/inventory.component.html',
        providers: [inventory_service_1.InventoryService, supplier_service_1.SupplierService, product_service_1.ProductService, angular2_notifications_1.NotificationsService]
    }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, product_service_1.ProductService, supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService])
], InventoryComponent);
exports.InventoryComponent = InventoryComponent;
//# sourceMappingURL=inventory.component.js.map