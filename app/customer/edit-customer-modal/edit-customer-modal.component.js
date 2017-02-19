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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var customer_service_1 = require("../customer.service");
var angular2_notifications_1 = require("angular2-notifications");
var EditCustomerModalComponent = (function () {
    function EditCustomerModalComponent(customerService, notificationService) {
        this.customerService = customerService;
        this.notificationService = notificationService;
        this.EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        this.customerNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEXP)]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
        this.customerIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onEditCustomer = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    EditCustomerModalComponent.prototype.ngOnInit = function () {
        this.customerIdFormControl.setValue(this.customer.id);
        this.customerNameFormControl.setValue(this.customer.name);
        this.emailAddressFormControl.setValue(this.customer.email);
        this.phoneNumberFormControl.setValue(this.customer.phone_number);
        this.editCustomerForm = new forms_1.FormGroup({
            name: this.customerNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl,
            customerId: this.customerIdFormControl
        });
    };
    EditCustomerModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    EditCustomerModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    EditCustomerModalComponent.prototype.editCustomer = function (customer, isValid) {
        var _this = this;
        console.log(customer);
        this.customerService.editCustomer(customer.customerId, customer)
            .subscribe(function (status) {
            _this.onEditCustomer.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(customer, isValid);
    };
    return EditCustomerModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], EditCustomerModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditCustomerModalComponent.prototype, "customer", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditCustomerModalComponent.prototype, "onEditCustomer", void 0);
EditCustomerModalComponent = __decorate([
    core_1.Component({
        selector: 'edit-customer-modal',
        templateUrl: './app/customer/edit-customer-modal/edit-customer-modal.component.html',
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, angular2_notifications_1.NotificationsService])
], EditCustomerModalComponent);
exports.EditCustomerModalComponent = EditCustomerModalComponent;
//# sourceMappingURL=edit-customer-modal.component.js.map