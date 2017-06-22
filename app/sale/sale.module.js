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
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_charts_1 = require("ng2-charts");
var sale_component_1 = require("./sale.component");
var sale_invoice_component_1 = require("./invoice/sale-invoice.component");
var record_sale_modal_component_1 = require("./record-sale-modal/record-sale-modal.component");
var sale_routing_1 = require("./sale.routing");
var SaleModule = (function () {
    function SaleModule() {
    }
    return SaleModule;
}());
SaleModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            ng2_charts_1.ChartsModule,
            ng2_table_1.Ng2TableModule,
            ng2_bootstrap_1.PaginationModule,
            ng2_bootstrap_2.ModalModule,
            ng2_bootstrap_3.TypeaheadModule,
            sale_routing_1.SaleRoutingModule,
            SimpleNotificationsModule
        ],
        declarations: [
            sale_component_1.SaleComponent,
            sale_invoice_component_1.SaleInvoiceComponent,
            record_sale_modal_component_1.RecordSaleModalComponent,
            sale_routing_1.routingComponents
        ]
    })
], SaleModule);
exports.SaleModule = SaleModule;
//# sourceMappingURL=sale.module.js.map