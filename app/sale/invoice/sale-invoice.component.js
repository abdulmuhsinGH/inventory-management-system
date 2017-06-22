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
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var sale_service_1 = require("../sale.service");
var SaleInvoiceComponent = (function () {
    function SaleInvoiceComponent(saleService, route) {
        this.saleService = saleService;
        this.route = route;
        this.title = 'Invoice';
    }
    SaleInvoiceComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SaleInvoiceComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    SaleInvoiceComponent.prototype.ngOnInit = function () {
        console.log(this.route.snapshot.queryParams);
        this.recordSaleFormData = JSON.parse(this.route.snapshot.queryParams['form-data']);
        console.log(this.recordSaleFormData);
    };
    return SaleInvoiceComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SaleInvoiceComponent.prototype, "childModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SaleInvoiceComponent.prototype, "value", void 0);
SaleInvoiceComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/sale/invoice/sale-invoice.component.html',
        providers: [sale_service_1.SaleService]
    }),
    __metadata("design:paramtypes", [sale_service_1.SaleService, router_1.ActivatedRoute])
], SaleInvoiceComponent);
exports.SaleInvoiceComponent = SaleInvoiceComponent;
//# sourceMappingURL=sale-invoice.component.js.map