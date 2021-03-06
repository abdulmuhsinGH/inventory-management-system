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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var FinancialReportComponent = (function () {
    function FinancialReportComponent() {
        this.title = 'Financial Reports';
    }
    FinancialReportComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    FinancialReportComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    return FinancialReportComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], FinancialReportComponent.prototype, "childModal", void 0);
FinancialReportComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/financial-report/financial-report.component.html',
    })
], FinancialReportComponent);
exports.FinancialReportComponent = FinancialReportComponent;
//# sourceMappingURL=financial-report.component.js.map