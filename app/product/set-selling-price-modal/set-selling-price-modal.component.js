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
var SetSellingPriceModalComponent = (function () {
    function SetSellingPriceModalComponent(productService, notificationService) {
        this.productService = productService;
        this.notificationService = notificationService;
        this.sellingPriceFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onSettingSellingPrice = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    SetSellingPriceModalComponent.prototype.ngOnInit = function () {
        console.log(this.productId);
        this.productIdFormControl.setValue(this.productId);
        this.setSellingPriceForm = new forms_1.FormGroup({
            current_selling_price: this.sellingPriceFormControl,
            productId: this.productIdFormControl
        });
    };
    SetSellingPriceModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SetSellingPriceModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    SetSellingPriceModalComponent.prototype.setSellingPrice = function (product, isValid) {
        var _this = this;
        console.log(product);
        this.productService.setSellingPrice(product.productId, product)
            .subscribe(function (status) {
            _this.onSettingSellingPrice.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(product, isValid);
    };
    return SetSellingPriceModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SetSellingPriceModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SetSellingPriceModalComponent.prototype, "productId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SetSellingPriceModalComponent.prototype, "onSettingSellingPrice", void 0);
SetSellingPriceModalComponent = __decorate([
    core_1.Component({
        selector: 'set-selling-price-modal',
        templateUrl: './app/product/set-selling-price-modal/set-selling-price-modal.component.html',
        providers: [product_service_1.ProductService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], SetSellingPriceModalComponent);
exports.SetSellingPriceModalComponent = SetSellingPriceModalComponent;
//# sourceMappingURL=set-selling-price-modal.component.js.map