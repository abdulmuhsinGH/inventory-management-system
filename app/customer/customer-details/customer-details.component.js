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
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var customer_service_1 = require("../customer.service");
var CustomerDetailsComponent = (function () {
    function CustomerDetailsComponent(route, router, customerService) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.title = 'Customer Profile';
    }
    CustomerDetailsComponent.prototype.ngOnInit = function () {
        this.getCustomerDetails();
    };
    CustomerDetailsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    CustomerDetailsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    CustomerDetailsComponent.prototype.getCustomerDetails = function () {
        var _this = this;
        var errorMessage;
        console.log(this.route.snapshot.params);
        this.customerId = +this.route.snapshot.params['customerId'];
        // this.customer.id = customerId;
        console.log(this.customerId);
        this.customerService.getCustomerDetails(this.customerId)
            .subscribe(function (customer) {
            _this.customer = customer,
                console.log(_this.customer);
        }, function (error) { return errorMessage = error; });
    };
    CustomerDetailsComponent.prototype.onChangeCustomerDetails = function () {
        this.getCustomerDetails();
    };
    return CustomerDetailsComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], CustomerDetailsComponent.prototype, "childModal", void 0);
CustomerDetailsComponent = __decorate([
    core_1.Component({
        /*selector: 'my-app',*/
        templateUrl: 'app/customer/customer-details/customer-details.component.html',
        providers: [customer_service_1.CustomerService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, customer_service_1.CustomerService])
], CustomerDetailsComponent);
exports.CustomerDetailsComponent = CustomerDetailsComponent;
//# sourceMappingURL=customer-details.component.js.map