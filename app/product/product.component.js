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
require("../rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var product_service_1 = require("./product.service");
var angular2_notifications_1 = require("angular2-notifications");
var ProductComponent = (function () {
    function ProductComponent(productService, angularNotificationService) {
        this.productService = productService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Product';
        this.searchTerms = new Subject_1.Subject();
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProductList();
        this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.productService.search(term)
            : Observable_1.Observable.of(_this.products); })
            .subscribe(function (products) {
            _this.products = products;
        }, function (error) { return _this.errorMessage = error; });
    };
    ProductComponent.prototype.getProductList = function () {
        var _this = this;
        this.productService.getProductList()
            .subscribe(function (products) {
            _this.products = products;
        }, function (error) { return _this.errorMessage = error; });
    };
    // Push a search term into the observable stream.
    ProductComponent.prototype.search = function (term) {
        term += " ";
        console.log(term);
        this.searchTerms.next(term);
    };
    ProductComponent.prototype.onChangeProductList = function () {
        this.getProductList();
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
        providers: [product_service_1.ProductService, angular2_notifications_1.NotificationsService],
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService, angular2_notifications_1.NotificationsService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map