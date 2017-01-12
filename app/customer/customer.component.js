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
var forms_1 = require("@angular/forms");
require("../rxjs-extensions");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var customer_service_1 = require("./customer.service");
var angular2_notifications_1 = require("angular2-notifications");
var CustomerComponent = (function () {
    /*Add new customer Form Setup*/
    function CustomerComponent(customerService, angularNotificationService) {
        this.customerService = customerService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Customers';
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        this.customerNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEXP)]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.getCustomerList();
        this.addCustomerForm = new forms_1.FormGroup({
            name: this.customerNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl
        });
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
    CustomerComponent.prototype.saveCustomer = function (customer, isValid) {
        var _this = this;
        this.customerService.addCustomer(customer)
            .subscribe(function (status) {
            _this.getCustomerList(),
                _this.angularNotificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(customer, isValid);
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
    __metadata("design:paramtypes", [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map