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
var router_1 = require("@angular/router");
var sale_component_1 = require("../sale/sale.component");
var sale_invoice_component_1 = require("../sale/invoice/sale-invoice.component");
var routes = [
    { path: 'sale', component: sale_component_1.SaleComponent },
    { path: 'sale-invoice', component: sale_invoice_component_1.SaleInvoiceComponent },
];
var SaleRoutingModule = (function () {
    function SaleRoutingModule() {
    }
    return SaleRoutingModule;
}());
SaleRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], SaleRoutingModule);
exports.SaleRoutingModule = SaleRoutingModule;
exports.routingComponents = [sale_component_1.SaleComponent, sale_invoice_component_1.SaleInvoiceComponent];
//# sourceMappingURL=sale.routing.js.map