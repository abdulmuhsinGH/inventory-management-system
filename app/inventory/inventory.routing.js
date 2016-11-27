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
var inventory_component_1 = require("../inventory/inventory.component");
var routes = [
    { path: 'inventory', component: inventory_component_1.InventoryComponent },
];
var InventoryRoutingModule = (function () {
    function InventoryRoutingModule() {
    }
    return InventoryRoutingModule;
}());
InventoryRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    }),
    __metadata("design:paramtypes", [])
], InventoryRoutingModule);
exports.InventoryRoutingModule = InventoryRoutingModule;
exports.routingComponents = [inventory_component_1.InventoryComponent];
//# sourceMappingURL=inventory.routing.js.map