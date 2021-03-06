"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap");
var ng2_bootstrap_3 = require("ng2-bootstrap");
var ng2_charts_1 = require("ng2-charts");
var angular2_notifications_1 = require("angular2-notifications");
var supplier_component_1 = require("./supplier.component");
var supplier_details_component_1 = require("./supplier-details/supplier-details.component");
var add_supplier_modal_component_1 = require("./add-supplier-modal/add-supplier-modal.component");
var edit_supplier_modal_component_1 = require("./edit-supplier-modal/edit-supplier-modal.component");
var supplier_routing_1 = require("./supplier.routing");
var SupplierModule = (function () {
    function SupplierModule() {
    }
    return SupplierModule;
}());
SupplierModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            ng2_charts_1.ChartsModule,
            ng2_bootstrap_1.PaginationModule.forRoot(),
            ng2_bootstrap_2.ModalModule.forRoot(),
            ng2_bootstrap_3.TypeaheadModule.forRoot(),
            supplier_routing_1.SupplierRoutingModule,
            angular2_notifications_1.SimpleNotificationsModule
        ],
        declarations: [
            supplier_component_1.SupplierComponent,
            supplier_details_component_1.SupplierDetailsComponent,
            add_supplier_modal_component_1.AddSupplierModalComponent,
            edit_supplier_modal_component_1.EditSupplierModalComponent,
            supplier_routing_1.routingComponents
        ]
    })
], SupplierModule);
exports.SupplierModule = SupplierModule;
//# sourceMappingURL=supplier.module.js.map