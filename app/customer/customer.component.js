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
require("../rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var customer_service_1 = require("./customer.service");
var angular2_notifications_1 = require("angular2-notifications");
var CustomerComponent = (function () {
    function CustomerComponent(customerService, angularNotificationService) {
        this.customerService = customerService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Customers';
        this.searchTerms = new Subject_1.Subject();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCustomerList();
        this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.customerService.search(term)
            : Observable_1.Observable.of(_this.customers); })
            .subscribe(function (customers) {
            _this.customers = customers;
        }, function (error) { return _this.errorMessage = error; });
    };
    CustomerComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.customerService.getCustomerList()
            .subscribe(function (customers) { return _this.customers = customers; }, function (error) { return _this.errorMessage = error; });
    };
    // Push a search term into the observable stream.
    CustomerComponent.prototype.search = function (term) {
        term += " ";
        console.log(term);
        this.searchTerms.next(term);
    };
    CustomerComponent.prototype.onChangeCustomerList = function () {
        this.getCustomerList();
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/customer/customer.component.html',
        providers: [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map