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
var product_service_1 = require("../product.service");
var angular2_notifications_1 = require("angular2-notifications");
var AddProductModalComponent = (function () {
    function AddProductModalComponent(productService, notificationService) {
        this.productService = productService;
        this.notificationService = notificationService;
        this.productNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.measurementFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onAddProduct = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    AddProductModalComponent.prototype.ngOnInit = function () {
        this.addProductForm = new forms_1.FormGroup({
            name: this.productNameFormControl,
            unit_of_measurment: this.measurementFormControl
        });
    };
    AddProductModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    AddProductModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    AddProductModalComponent.prototype.saveProduct = function (product, isValid) {
        var _this = this;
        this.productService.addProduct(product)
            .subscribe(function (status) {
            _this.onAddProduct.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(product, isValid);
    };
    return AddProductModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AddProductModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddProductModalComponent.prototype, "onAddProduct", void 0);
AddProductModalComponent = __decorate([
    core_1.Component({
        selector: 'add-product-modal',
        templateUrl: './app/product/add-product-modal/add-product-modal.component.html',
        providers: [product_service_1.ProductService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], AddProductModalComponent);
exports.AddProductModalComponent = AddProductModalComponent;
//# sourceMappingURL=add-product-modal.component.js.map