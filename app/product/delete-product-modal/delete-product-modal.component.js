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
var DeleteProductModalComponent = (function () {
    function DeleteProductModalComponent(productService, notificationService) {
        this.productService = productService;
        this.notificationService = notificationService;
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onDeleteProduct = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    DeleteProductModalComponent.prototype.ngOnInit = function () {
        this.productIdFormControl.setValue(this.product.id);
        this.deleteProductForm = new forms_1.FormGroup({
            productId: this.productIdFormControl,
        });
    };
    DeleteProductModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    DeleteProductModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    DeleteProductModalComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        console.log(product.productId);
        this.productService.deleteProduct(product.productId)
            .subscribe(function (status) {
            _this.onDeleteProduct.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(product);
    };
    return DeleteProductModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], DeleteProductModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DeleteProductModalComponent.prototype, "product", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DeleteProductModalComponent.prototype, "onDeleteProduct", void 0);
DeleteProductModalComponent = __decorate([
    core_1.Component({
        selector: 'delete-product-modal',
        templateUrl: './app/product/delete-product-modal/delete-product-modal.component.html',
        providers: [product_service_1.ProductService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], DeleteProductModalComponent);
exports.DeleteProductModalComponent = DeleteProductModalComponent;
//# sourceMappingURL=delete-product-modal.component.js.map