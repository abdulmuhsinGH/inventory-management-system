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
var ng2_bootstrap_4 = require("ng2-bootstrap");
var ng2_charts_1 = require("ng2-charts");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
//import { DashboardComponent }   from '../dashboard/dashboard.component';
var financial_report_component_1 = require("../financial-report/financial-report.component");
var product_module_1 = require("../product/product.module");
var inventory_module_1 = require("../inventory/inventory.module");
var customer_module_1 = require("../customer/customer.module");
var supplier_module_1 = require("../supplier/supplier.module");
var sale_module_1 = require("../sale/sale.module");
var dashboard_module_1 = require("../dashboard/dashboard.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            /*JsonpModule,*/
            app_routing_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            ng2_charts_1.ChartsModule,
            ng2_bootstrap_1.PaginationModule.forRoot(),
            ng2_bootstrap_2.ModalModule,
            ng2_bootstrap_4.TypeaheadModule,
            product_module_1.ProductModule,
            supplier_module_1.SupplierModule,
            customer_module_1.CustomerModule,
            sale_module_1.SaleModule,
            inventory_module_1.InventoryModule,
            dashboard_module_1.DashboardModule,
            ng2_bootstrap_3.TabsModule.forRoot(),
        ],
        declarations: [app_component_1.AppComponent,
            financial_report_component_1.FinancialReportComponent,
            app_routing_1.routingComponents,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map