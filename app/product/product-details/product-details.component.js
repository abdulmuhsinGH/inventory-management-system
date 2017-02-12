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
var router_1 = require("@angular/router");
var product_service_1 = require("../product.service");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(route, router, productService) {
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.title = 'Product Details';
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        this.getProductDetails();
        /*this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) => this.service.getHero(+params['id']))
        .subscribe((hero: Hero) => this.hero = hero);*/
    };
    ProductDetailsComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    ProductDetailsComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    ProductDetailsComponent.prototype.getProductDetails = function () {
        var _this = this;
        console.log(this.route.snapshot.params);
        var productId = +this.route.snapshot.params['productId'];
        console.log(productId);
        this.productService.getProductDetails(productId)
            .subscribe(function (product) {
            _this.product = product,
                console.log(_this.product);
        }, function (error) { return _this.errorMessage = error; });
    };
    return ProductDetailsComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], ProductDetailsComponent.prototype, "childModal", void 0);
ProductDetailsComponent = __decorate([
    core_1.Component({
        /*selector: 'my-dashboard',*/
        templateUrl: './app/product/product-details/product-details.component.html',
        providers: [product_service_1.ProductService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, product_service_1.ProductService])
], ProductDetailsComponent);
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map