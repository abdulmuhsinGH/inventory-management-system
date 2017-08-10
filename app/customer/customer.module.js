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
var angular2_notifications_1 = require("angular2-notifications");
var customer_component_1 = require("./customer.component");
var customer_details_component_1 = require("./customer-details/customer-details.component");
var add_customer_modal_component_1 = require("./add-customer-modal/add-customer-modal.component");
var edit_customer_modal_component_1 = require("./edit-customer-modal/edit-customer-modal.component");
var customer_routing_1 = require("./customer.routing");
var CustomerModule = (function () {
    function CustomerModule() {
    }
    return CustomerModule;
}());
CustomerModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            //ChartsModule,
            ng2_bootstrap_1.PaginationModule.forRoot(),
            ng2_bootstrap_2.ModalModule.forRoot(),
            ng2_bootstrap_3.TypeaheadModule.forRoot(),
            customer_routing_1.CustomerRoutingModule,
            angular2_notifications_1.SimpleNotificationsModule
        ],
        declarations: [
            customer_component_1.CustomerComponent,
            customer_details_component_1.CustomerDetailsComponent,
            add_customer_modal_component_1.AddCustomerComponent,
            edit_customer_modal_component_1.EditCustomerModalComponent,
            customer_routing_1.routingComponents
        ]
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map