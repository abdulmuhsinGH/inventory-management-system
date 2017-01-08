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
var forms_1 = require("@angular/forms");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var SaleComponent = (function () {
    // Formbuilder will be used to simplify syntax and validation
    function SaleComponent(_formBuilder) {
        this._formBuilder = _formBuilder;
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
    SaleComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SaleComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    //initialize form
    SaleComponent.prototype.ngOnInit = function () {
        this.recordSaleForm = this._formBuilder.group({
            sales: this._formBuilder.array([
                this.initSaleForm(),
            ])
        });
    };
    SaleComponent.prototype.initSaleForm = function () {
        return this._formBuilder.group({
            product: ['', forms_1.Validators.required],
            quantity: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required]
        });
    };
    SaleComponent.prototype.addRecordSaleRow = function () {
        var control = this.recordSaleForm.controls['sales'];
        control.push(this.initSaleForm());
    };
    SaleComponent.prototype.removeRecordSaleRow = function (rowNumber) {
        var control = this.recordSaleForm.controls['sales'];
        control.removeAt(rowNumber);
    };
    SaleComponent.prototype.recordSale = function (model) {
        console.log(model);
    };
    return SaleComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SaleComponent.prototype, "childModal", void 0);
SaleComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/sale/sale.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], SaleComponent);
exports.SaleComponent = SaleComponent;
//# sourceMappingURL=sale.component.js.map