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
var product_service_1 = require("./product.service");
var table_1 = require("../other/table");
var angular2_notifications_1 = require("angular2-notifications");
var ProductComponent = (function () {
    function ProductComponent(productService, angularNotificationService) {
        this.productService = productService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Product';
        this.productTable = table_1.Table;
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.productNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.measurementFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        //categoryFormControl:FormControl = new FormControl(0, [Validators.required, Validators.pattern('^[0-9\-\+]{9,15}$')]);
        /*Add new product Form Setup*/
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
        this.addProductForm = new forms_1.FormGroup({
            name: this.productNameFormControl,
            unit_of_measurment: this.measurementFormControl
        });
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
    ProductComponent.prototype.saveProduct = function (product, isValid) {
        var _this = this;
        this.productService.addProduct(product)
            .subscribe(function (status) {
            _this.getProductList(),
                _this.angularNotificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(product, isValid);
    };
    ProductComponent.prototype.addToast = function () {
        this.angularNotificationService.success('Some Title', 'Some Content');
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
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map