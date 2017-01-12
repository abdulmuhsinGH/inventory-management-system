"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*Angular 2 modules*/
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/
/* Third party modules */
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap");
var ng2_bootstrap_3 = require("ng2-bootstrap");
var ng2_table_1 = require("ng2-table/ng2-table");
var angular2_notifications_1 = require("angular2-notifications");
var inventory_routing_1 = require("./inventory.routing");
var inventory_component_1 = require("../inventory/inventory.component");
var InventoryModule = (function () {
    function InventoryModule() {
    }
    return InventoryModule;
}());
InventoryModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            ng2_table_1.Ng2TableModule,
            ng2_bootstrap_1.PaginationModule,
            ng2_bootstrap_2.ModalModule.forRoot(),
            ng2_bootstrap_3.TypeaheadModule.forRoot(),
            inventory_routing_1.InventoryRoutingModule,
            angular2_notifications_1.SimpleNotificationsModule
        ],
        declarations: [
            inventory_component_1.InventoryComponent,
            inventory_routing_1.routingComponents
        ]
    })
], InventoryModule);
exports.InventoryModule = InventoryModule;
//# sourceMappingURL=inventory.module.js.map