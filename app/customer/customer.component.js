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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var customer_service_1 = require("./customer.service");
var CustomerComponent = (function () {
    function CustomerComponent(customerService) {
        this.customerService = customerService;
        this.title = 'Customers';
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.getCustomerList();
    };
    CustomerComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    CustomerComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    CustomerComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.customerService.getCustomerList()
            .subscribe(function (customers) { return _this.customers = customers; }, function (error) { return _this.errorMessage = error; });
    };
    return CustomerComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], CustomerComponent.prototype, "childModal", void 0);
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/customer/customer.component.html',
        providers: [customer_service_1.CustomerService],
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map