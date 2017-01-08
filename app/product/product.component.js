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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var product_service_1 = require("./product.service");
var table_1 = require("../other/table");
var ProductComponent = (function () {
    function ProductComponent(productService) {
        this.productService = productService;
        this.title = 'Product';
        this.productTable = table_1.Table;
        //configuration for table 
        this.rows = [];
        this.columns = [
            { title: 'Name', name: 'name' },
            { title: 'Unit of Measurement', className: ['office-header', 'text-success'], name: 'unit_of_measurment', sort: 'asc' }
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: {
                name: { filterString: '' }
            },
            className: ['table-striped', 'table-bordered']
        };
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.productTable;
        this.getProductList();
    };
    ProductComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ProductComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ProductComponent.prototype.getProductList = function () {
        var _this = this;
        this.productService.getProductList()
            .subscribe(function (products) {
            _this.products = products,
                _this.productTable = new table_1.Table(_this.config, products, _this.columns);
        }, function (error) { return _this.errorMessage = error; });
    };
    return ProductComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], ProductComponent.prototype, "childModal", void 0);
ProductComponent = __decorate([
    core_1.Component({
        /*selector: 'my-dashboard',*/
        templateUrl: './app/product/product.component.html',
        providers: [product_service_1.ProductService],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map