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
require("../rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var supplier_service_1 = require("./supplier.service");
var angular2_notifications_1 = require("angular2-notifications");
var SupplierComponent = (function () {
    function SupplierComponent(supplierService, angularNotificationService) {
        this.supplierService = supplierService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Suppliers';
        this.searchTerms = new Subject_1.Subject();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    SupplierComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSuppliersList();
        this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.supplierService.search(term)
            : Observable_1.Observable.of(_this.suppliers); })
            .subscribe(function (suppliers) {
            _this.suppliers = suppliers;
        }, function (error) { return _this.errorMessage = error; });
    };
    SupplierComponent.prototype.getSuppliersList = function () {
        var _this = this;
        this.supplierService.getSupplierList()
            .subscribe(function (suppliers) { return _this.suppliers = suppliers; }, function (error) { return _this.errorMessage = error; });
    };
    // Push a search term into the observable stream.
    SupplierComponent.prototype.search = function (term) {
        term += " ";
        console.log(term);
        this.searchTerms.next(term);
    };
    SupplierComponent.prototype.onChangeSupplierList = function () {
        this.getSuppliersList();
    };
    return SupplierComponent;
}());
SupplierComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/supplier/supplier.component.html',
        providers: [supplier_service_1.SupplierService],
    }),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService])
], SupplierComponent);
exports.SupplierComponent = SupplierComponent;
//# sourceMappingURL=supplier.component.js.map