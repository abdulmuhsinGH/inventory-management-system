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
var Observable_1 = require("rxjs/Observable");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var sale_service_1 = require("../sale.service");
var customer_service_1 = require("../../customer/customer.service");
var product_service_1 = require("../../product/product.service");
var angular2_notifications_1 = require("angular2-notifications");
var RecordSaleModalComponent = (function () {
    // Formbuilder will be used to simplify syntax and validation
    function RecordSaleModalComponent(_formBuilder, customerService, productService, notificationService) {
        var _this = this;
        this._formBuilder = _formBuilder;
        this.customerService = customerService;
        this.productService = productService;
        this.notificationService = notificationService;
        this.customSelected = '';
        this.groupSelected = '';
        this.selected = '';
        this.asyncSelected = '';
        this.typeAheadLoading = false;
        this.typeAheadNoResults = false;
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.onChangeSalesList = new core_1.EventEmitter();
        this.customerNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.customerIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.dataSource = Observable_1.Observable.create(function (observer) {
            // Runs on every search
            observer.next(_this.asyncSelected);
        }).mergeMap(function (token) { return _this.getProductAsObservable(token); });
    }
    RecordSaleModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    RecordSaleModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    //initialize form
    RecordSaleModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCustomerList()
            .subscribe(function (customers) { return _this.customers = customers; }, function (error) { return _this.errorMessage = error; });
        this.productService.getProductList()
            .subscribe(function (products) { return _this.products = products; }, function (error) { return _this.errorMessage = error; });
        this.recordSaleForm = this._formBuilder.group({
            customer: this.customerNameFormControl,
            customerId: this.customerIdFormControl,
            sales: this._formBuilder.array([
                this.initSaleForm(),
            ])
        });
    };
    RecordSaleModalComponent.prototype.initSaleForm = function () {
        return this._formBuilder.group({
            product: ['', forms_1.Validators.required],
            productId: this.productIdFormControl,
            quantity: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required]
        });
    };
    RecordSaleModalComponent.prototype.addRecordSaleRow = function () {
        var control = this.recordSaleForm.controls['sales'];
        control.push(this.initSaleForm());
    };
    RecordSaleModalComponent.prototype.removeRecordSaleRow = function (rowNumber) {
        var control = this.recordSaleForm.controls['sales'];
        control.removeAt(rowNumber);
    };
    RecordSaleModalComponent.prototype.recordSale = function (model) {
        console.log(model);
    };
    RecordSaleModalComponent.prototype.changeTypeAheadLoading = function (e) {
        this.typeAheadLoading = e;
    };
    RecordSaleModalComponent.prototype.changeTypeAheadNoResults = function (e) {
        this.typeAheadNoResults = e;
    };
    RecordSaleModalComponent.prototype.typeAheadOnSelectCustomer = function (e) {
        this.customerIdFormControl.setValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    RecordSaleModalComponent.prototype.typeAheadOnSelectProduct = function (e) {
        this.productIdFormControl.patchValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    RecordSaleModalComponent.prototype.getProductAsObservable = function (token) {
        var query = new RegExp(token, 'ig');
        console.log(this.products);
        return Observable_1.Observable.of(this.products.filter(function (inventory) {
            return query.test(inventory.name);
        }));
    };
    return RecordSaleModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], RecordSaleModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RecordSaleModalComponent.prototype, "onChangeSalesList", void 0);
RecordSaleModalComponent = __decorate([
    core_1.Component({
        selector: 'record-sale-modal',
        templateUrl: 'app/sale/record-sale-modal/record-sale-modal.component.html',
        providers: [product_service_1.ProductService, customer_service_1.CustomerService, sale_service_1.SaleService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, customer_service_1.CustomerService, product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], RecordSaleModalComponent);
exports.RecordSaleModalComponent = RecordSaleModalComponent;
//# sourceMappingURL=record-sale-modal.component.js.map