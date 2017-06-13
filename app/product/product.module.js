"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
/*import { MyDateRangePickerModule } from 'mydaterangepicker/dist/my-date-range-picker.module';*/
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap");
var ng2_bootstrap_3 = require("ng2-bootstrap");
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var angular2_notifications_1 = require("angular2-notifications");
var product_component_1 = require("./product.component");
var product_details_component_1 = require("./product-details/product-details.component");
var add_product_modal_component_1 = require("./add-product-modal/add-product-modal.component");
var delete_product_modal_component_1 = require("./delete-product-modal/delete-product-modal.component");
var edit_product_modal_component_1 = require("./edit-product-modal/edit-product-modal-component");
var set_selling_price_modal_component_1 = require("./set-selling-price-modal/set-selling-price-modal.component");
var set_cost_price_modal_component_1 = require("./set-cost-price-modal/set-cost-price-modal.component");
var product_routing_1 = require("./product.routing");
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
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
            product_routing_1.ProductRoutingModule,
            angular2_notifications_1.SimpleNotificationsModule
        ],
        declarations: [
            product_component_1.ProductComponent,
            product_details_component_1.ProductDetailsComponent,
            add_product_modal_component_1.AddProductModalComponent,
            delete_product_modal_component_1.DeleteProductModalComponent,
            edit_product_modal_component_1.EditProductModalComponent,
            set_selling_price_modal_component_1.SetSellingPriceModalComponent,
            set_cost_price_modal_component_1.SetCostPriceModalComponent,
            product_routing_1.routingComponents
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map