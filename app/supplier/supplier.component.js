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
var supplier_service_1 = require("./supplier.service");
var SupplierComponent = (function () {
    /*Add new supplier Form Setup*/
    function SupplierComponent(supplierService) {
        this.supplierService = supplierService;
        this.title = 'Suppliers';
        this.EMAIL_REGEXP = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        this.supplierNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.emailAddressFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.EMAIL_REGEXP)]);
        this.phoneNumberFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9\-\+]{9,15}$')]);
    }
    SupplierComponent.prototype.ngOnInit = function () {
        this.getSuppliersList();
        this.addSupplierForm = new forms_1.FormGroup({
            name: this.supplierNameFormControl,
            email: this.emailAddressFormControl,
            phone_number: this.phoneNumberFormControl
        });
    };
    SupplierComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SupplierComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    SupplierComponent.prototype.getSuppliersList = function () {
        var _this = this;
        this.supplierService.getSupplierList()
            .subscribe(function (suppliers) { return _this.suppliers = suppliers; }, function (error) { return _this.errorMessage = error; });
    };
    SupplierComponent.prototype.saveSupplier = function (supplier, isValid) {
        var _this = this;
        this.supplierService.addSupplier(supplier)
            .subscribe(function (status) {
            console.log(status),
                _this.getSuppliersList();
        }, function (error) { return console.log(error); });
        console.log(supplier, isValid);
    };
    return SupplierComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SupplierComponent.prototype, "childModal", void 0);
SupplierComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/supplier/supplier.component.html',
        providers: [supplier_service_1.SupplierService],
    }),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierComponent);
exports.SupplierComponent = SupplierComponent;
//# sourceMappingURL=supplier.component.js.map