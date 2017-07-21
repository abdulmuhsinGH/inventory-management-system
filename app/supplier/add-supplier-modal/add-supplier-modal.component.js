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
var supplier_service_1 = require("../supplier.service");
var angular2_notifications_1 = require("angular2-notifications");
var AddSupplierModalComponent = (function () {
    /*Add new supplier Form Setup*/
    function AddSupplierModalComponent(supplierService, angularNotificationService) {
        this.supplierService = supplierService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Suppliers';
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.onAddingNewSupplier = new core_1.EventEmitter();
        this.supplierNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
    }
    AddSupplierModalComponent.prototype.ngOnInit = function () {
        this.addSupplierForm = new forms_1.FormGroup({
            name: this.supplierNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl
        });
    };
    AddSupplierModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    AddSupplierModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    AddSupplierModalComponent.prototype.saveSupplier = function (supplier, isValid) {
        var _this = this;
        this.supplierService.addSupplier(supplier)
            .subscribe(function (status) {
            _this.onAddingNewSupplier.emit(true),
                _this.angularNotificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(supplier, isValid);
    };
    return AddSupplierModalComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddSupplierModalComponent.prototype, "onAddingNewSupplier", void 0);
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AddSupplierModalComponent.prototype, "childModal", void 0);
AddSupplierModalComponent = __decorate([
    core_1.Component({
        selector: 'add-supplier-modal',
        templateUrl: 'app/supplier/add-supplier-modal/add-supplier-modal.component.html',
        providers: [supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService])
], AddSupplierModalComponent);
exports.AddSupplierModalComponent = AddSupplierModalComponent;
//# sourceMappingURL=add-supplier-modal.component.js.map