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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var supplier_service_1 = require("../supplier.service");
var SupplierDetailsComponent = (function () {
    function SupplierDetailsComponent(route, router, supplierService) {
        this.route = route;
        this.router = router;
        this.supplierService = supplierService;
        this.title = 'Supplier Profile';
    }
    SupplierDetailsComponent.prototype.ngOnInit = function () {
        this.getSupplierDetails();
    };
    SupplierDetailsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    SupplierDetailsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    SupplierDetailsComponent.prototype.getSupplierDetails = function () {
        var _this = this;
        var errorMessage;
        console.log(this.route.snapshot.params);
        this.supplierId = +this.route.snapshot.params['supplierId'];
        // this.supplier.id = supplierId;
        console.log(this.supplierId);
        this.supplierService.getSupplierDetails(this.supplierId)
            .subscribe(function (supplier) {
            _this.supplier = supplier,
                console.log(_this.supplier);
        }, function (error) { return errorMessage = error; });
    };
    SupplierDetailsComponent.prototype.onChangeSupplierDetails = function () {
        this.getSupplierDetails();
    };
    return SupplierDetailsComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], SupplierDetailsComponent.prototype, "childModal", void 0);
SupplierDetailsComponent = __decorate([
    core_1.Component({
        /*selector: 'my-app',*/
        templateUrl: 'app/supplier/supplier-details/supplier-details.component.html',
        providers: [supplier_service_1.SupplierService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, supplier_service_1.SupplierService])
], SupplierDetailsComponent);
exports.SupplierDetailsComponent = SupplierDetailsComponent;
//# sourceMappingURL=supplier-details.component.js.map