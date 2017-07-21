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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sale_service_1 = require("./sale.service");
var SaleComponent = (function () {
    // Formbuilder will be used to simplify syntax and validation
    function SaleComponent(saleService, router) {
        this.saleService = saleService;
        this.router = router;
        this.title = 'Sales';
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' },
        ];
        this.lineChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    //initialize form
    SaleComponent.prototype.ngOnInit = function () {
        this.getSalesList();
        console.log(this.salesList);
    };
    SaleComponent.prototype.formatJSONStringInSalesList = function () {
        for (var _i = 0, _a = this.salesList; _i < _a.length; _i++) {
            var sale = _a[_i];
            sale.transaction_details = JSON.parse(sale.transaction_details);
            console.log(sale.transaction_details);
        }
    };
    SaleComponent.prototype.viewInvoice = function (sale) {
        this.router.navigateByUrl("/sale-invoice?form-data=" + JSON.stringify(sale));
    };
    SaleComponent.prototype.getSalesList = function () {
        var _this = this;
        this.saleService.getSalesList()
            .subscribe(function (salesList) {
            _this.salesList = salesList,
                _this.formatJSONStringInSalesList();
        }, function (error) { return _this.errorMessage = error; });
        console.log(this.salesList);
    };
    return SaleComponent;
}());
SaleComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/sale/sale.component.html',
        providers: [sale_service_1.SaleService]
    }),
    __metadata("design:paramtypes", [sale_service_1.SaleService, router_1.Router])
], SaleComponent);
exports.SaleComponent = SaleComponent;
//# sourceMappingURL=sale.component.js.map