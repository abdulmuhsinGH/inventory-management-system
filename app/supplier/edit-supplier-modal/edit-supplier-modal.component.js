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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var supplier_service_1 = require("../supplier.service");
var angular2_notifications_1 = require("angular2-notifications");
var EditSupplierModalComponent = (function () {
    function EditSupplierModalComponent(supplierService, notificationService) {
        this.supplierService = supplierService;
        this.notificationService = notificationService;
        this.EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        this.supplierNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEXP)]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
        this.supplierIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onEditSupplier = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    EditSupplierModalComponent.prototype.ngOnInit = function () {
        this.supplierIdFormControl.setValue(this.supplier.id);
        this.supplierNameFormControl.setValue(this.supplier.name);
        this.emailAddressFormControl.setValue(this.supplier.email);
        this.phoneNumberFormControl.setValue(this.supplier.phone_number);
        this.editSupplierForm = new forms_1.FormGroup({
            name: this.supplierNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl,
            supplierId: this.supplierIdFormControl
        });
    };
    EditSupplierModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    EditSupplierModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    EditSupplierModalComponent.prototype.editSupplier = function (supplier, isValid) {
        var _this = this;
        console.log(supplier);
        this.supplierService.editSupplier(supplier.supplierId, supplier)
            .subscribe(function (status) {
            _this.onEditSupplier.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(supplier, isValid);
    };
    return EditSupplierModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], EditSupplierModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditSupplierModalComponent.prototype, "supplier", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditSupplierModalComponent.prototype, "onEditSupplier", void 0);
EditSupplierModalComponent = __decorate([
    core_1.Component({
        selector: 'edit-supplier-modal',
        templateUrl: './app/supplier/edit-supplier-modal/edit-supplier-modal.component.html',
        providers: [angular2_notifications_1.NotificationsService]
    }),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService])
], EditSupplierModalComponent);
exports.EditSupplierModalComponent = EditSupplierModalComponent;
//# sourceMappingURL=edit-supplier-modal.component.js.map