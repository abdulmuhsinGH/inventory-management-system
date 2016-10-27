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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap');
var ng2_bootstrap_3 = require('ng2-bootstrap');
var ng2_table_1 = require('ng2-table/ng2-table');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var dashboard_component_1 = require('../dashboard/dashboard.component');
var product_component_1 = require('../product/product.component');
var inventory_component_1 = require('../inventory/inventory.component');
var customer_component_1 = require('../customer/customer.component');
var supplier_component_1 = require('../supplier/supplier.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                ng2_charts_1.ChartsModule,
                ng2_table_1.Ng2TableModule,
                ng2_bootstrap_1.PaginationModule,
                ng2_bootstrap_2.ModalModule,
                ng2_bootstrap_3.TypeaheadModule
            ],
            declarations: [app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                app_routing_1.routingComponents,
                product_component_1.ProductComponent,
                inventory_component_1.InventoryComponent,
                customer_component_1.CustomerComponent,
                supplier_component_1.SupplierComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map