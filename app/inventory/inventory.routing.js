"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var inventory_component_1 = require("../inventory/inventory.component");
var add_inventory_modal_component_1 = require("../inventory/add-inventory-modal/add-inventory-modal.component");
var routes = [
    { path: 'inventory', component: inventory_component_1.InventoryComponent },
    { path: 'inventory/add', component: add_inventory_modal_component_1.AddInventoryModalComponent },
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
    })
], InventoryRoutingModule);
exports.InventoryRoutingModule = InventoryRoutingModule;
exports.routingComponents = [inventory_component_1.InventoryComponent];
//# sourceMappingURL=inventory.routing.js.map