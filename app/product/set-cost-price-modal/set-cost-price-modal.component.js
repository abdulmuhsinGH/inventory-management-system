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
var product_service_1 = require("../product.service");
var angular2_notifications_1 = require("angular2-notifications");
var SetCostPriceModalComponent = (function () {
    function SetCostPriceModalComponent(productService, notificationService) {
        this.productService = productService;
        this.notificationService = notificationService;
        this.costPriceFormControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.onSettingCostPrice = new core_1.EventEmitter();
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
    }
    SetCostPriceModalComponent.prototype.ngOnInit = function () {
        console.log(this.productId);
        this.productIdFormControl.setValue(this.productId);
        this.setCostPriceForm = new forms_1.FormGroup({
            current_cost_price: this.costPriceFormControl,
            productId: this.productIdFormControl
        });
    };
    SetCostPriceModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SetCostPriceModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    SetCostPriceModalComponent.prototype.setCostPrice = function (product, isValid) {
        var _this = this;
        console.log(product);
        this.productService.setCostPrice(product.productId, product)
            .subscribe(function (status) {
            _this.onSettingCostPrice.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(product, isValid);
    };
    return SetCostPriceModalComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SetCostPriceModalComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SetCostPriceModalComponent.prototype, "productId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SetCostPriceModalComponent.prototype, "onSettingCostPrice", void 0);
SetCostPriceModalComponent = __decorate([
    core_1.Component({
        selector: 'set-cost-price-modal',
        templateUrl: './app/product/set-cost-price-modal/set-cost-price-modal.component.html',
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], SetCostPriceModalComponent);
exports.SetCostPriceModalComponent = SetCostPriceModalComponent;
//# sourceMappingURL=set-cost-price-modal.component.js.map