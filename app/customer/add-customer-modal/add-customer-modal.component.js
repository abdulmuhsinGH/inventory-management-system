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
var forms_1 = require("@angular/forms");
require("../../rxjs-extensions");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var customer_service_1 = require("../customer.service");
var angular2_notifications_1 = require("angular2-notifications");
var AddCustomerComponent = (function () {
    /*Add new customer Form Setup*/
    function AddCustomerComponent(customerService, angularNotificationService) {
        this.customerService = customerService;
        this.angularNotificationService = angularNotificationService;
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        /*@Input()
        public customer:Customer;*/
        this.onAddingNewCustomer = new core_1.EventEmitter();
        this.EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        this.customerNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEXP)]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
    }
    AddCustomerComponent.prototype.ngOnInit = function () {
        this.addCustomerForm = new forms_1.FormGroup({
            name: this.customerNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl
        });
    };
    AddCustomerComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    AddCustomerComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    AddCustomerComponent.prototype.saveCustomer = function (customer, isValid) {
        var _this = this;
        this.customerService.addCustomer(customer)
            .subscribe(function (status) {
            _this.onAddingNewCustomer.emit(true),
                _this.angularNotificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(customer, isValid);
    };
    return AddCustomerComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddCustomerComponent.prototype, "onAddingNewCustomer", void 0);
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AddCustomerComponent.prototype, "childModal", void 0);
AddCustomerComponent = __decorate([
    core_1.Component({
        selector: 'add-customer-modal',
        templateUrl: 'app/customer/add-customer-modal/add-customer-modal.component.html',
        providers: [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService])
], AddCustomerComponent);
exports.AddCustomerComponent = AddCustomerComponent;
//# sourceMappingURL=add-customer-modal.component.js.map