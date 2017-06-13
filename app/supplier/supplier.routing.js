"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var supplier_component_1 = require("../supplier/supplier.component");
var supplier_details_component_1 = require("../supplier/supplier-details/supplier-details.component");
var routes = [
    { path: 'supplier', component: supplier_component_1.SupplierComponent },
    { path: 'supplier-details/:supplierId', component: supplier_details_component_1.SupplierDetailsComponent },
];
var SupplierRoutingModule = (function () {
    function SupplierRoutingModule() {
    }
    return SupplierRoutingModule;
}());
SupplierRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], SupplierRoutingModule);
exports.SupplierRoutingModule = SupplierRoutingModule;
exports.routingComponents = [supplier_component_1.SupplierComponent, supplier_details_component_1.SupplierDetailsComponent];
//# sourceMappingURL=supplier.routing.js.map