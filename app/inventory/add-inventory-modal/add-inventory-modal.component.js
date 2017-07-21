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
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var inventory_service_1 = require("../inventory-main-service/inventory.service");
var angular2_notifications_1 = require("angular2-notifications");
var AddInventoryModalComponent = (function () {
    function AddInventoryModalComponent(inventoryService, notificationService) {
        var _this = this;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
        this.productNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.supplierNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.supplierIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.quantityFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        this.totalCostFormControl = new forms_1.FormControl({ value: 0, disabled: true });
        this.costPriceFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        /*Add new inventory Form Setup*/
        this.customSelected = '';
        this.groupSelected = '';
        this.selected = '';
        this.asyncSelected = '';
        this.typeAheadLoading = false;
        this.typeAheadNoResults = false;
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.onInventoryAdd = new core_1.EventEmitter();
        this.dataSource = Observable_1.Observable.create(function (observer) {
            // Runs on every search
            observer.next(_this.asyncSelected);
        }).mergeMap(function (token) { return _this.getProductAsObservable(token); });
    }
    AddInventoryModalComponent.prototype.ngOnInit = function () {
        this.addInventoryForm = new forms_1.FormGroup({
            name: this.productNameFormControl,
            product_id: this.productIdFormControl,
            supplier: this.supplierNameFormControl,
            supplier_id: this.supplierIdFormControl,
            quantity: this.quantityFormControl,
            total_cost: this.totalCostFormControl,
            cost_price: this.costPriceFormControl
        });
        this.totalCostSubcribeToCostPriceChanges();
        this.totcalCostSubcribeToQuantityChanges();
    };
    AddInventoryModalComponent.prototype.totalCostSubcribeToCostPriceChanges = function () {
        var _this = this;
        // initialize stream
        var costPriceValueChanges$ = this.costPriceFormControl.valueChanges;
        // subscribe to the stream 
        costPriceValueChanges$.subscribe(function (x) { return _this.totalCostFormControl.setValue(x * _this.quantityFormControl.value); });
    };
    AddInventoryModalComponent.prototype.totcalCostSubcribeToQuantityChanges = function () {
        var _this = this;
        // initialize stream
        var quantityValueChanges$ = this.quantityFormControl.valueChanges;
        // subscribe to the stream 
        quantityValueChanges$.subscribe(function (x) { return _this.totalCostFormControl.setValue(x * _this.costPriceFormControl.value); });
    };
    AddInventoryModalComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    AddInventoryModalComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    AddInventoryModalComponent.prototype.getProductAsObservable = function (token) {
        var query = new RegExp(token, 'ig');
        console.log(this.products);
        return Observable_1.Observable.of(this.products.filter(function (inventory) {
            return query.test(inventory.name);
        }));
    };
    AddInventoryModalComponent.prototype.changeTypeAheadLoading = function (e) {
        this.typeAheadLoading = e;
    };
    AddInventoryModalComponent.prototype.changeTypeAheadNoResults = function (e) {
        this.typeAheadNoResults = e;
    };
    AddInventoryModalComponent.prototype.typeAheadOnSelectProduct = function (e) {
        this.productIdFormControl.setValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    AddInventoryModalComponent.prototype.typeAheadOnSelectSupplier = function (e) {
        this.supplierIdFormControl.setValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    AddInventoryModalComponent.prototype.saveInventory = function (inventory, isValid) {
        var _this = this;
        this.inventoryService.addInventory(inventory)
            .subscribe(function (status) {
            _this.onInventoryAdd.emit(true),
                _this.notificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        console.log(inventory, isValid);
    };
    return AddInventoryModalComponent;
}());
__decorate([
    core_1.Input('suppliers'),
    __metadata("design:type", Array)
], AddInventoryModalComponent.prototype, "suppliers", void 0);
__decorate([
    core_1.Input('products'),
    __metadata("design:type", Array)
], AddInventoryModalComponent.prototype, "products", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddInventoryModalComponent.prototype, "onInventoryAdd", void 0);
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AddInventoryModalComponent.prototype, "childModal", void 0);
AddInventoryModalComponent = __decorate([
    core_1.Component({
        selector: 'add-inventory-modal',
        templateUrl: './app/inventory/add-inventory-modal/add-inventory-modal.component.html',
        providers: [inventory_service_1.InventoryService, angular2_notifications_1.NotificationsService]
    }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, angular2_notifications_1.NotificationsService])
], AddInventoryModalComponent);
exports.AddInventoryModalComponent = AddInventoryModalComponent;
//# sourceMappingURL=add-inventory-modal.component.js.map