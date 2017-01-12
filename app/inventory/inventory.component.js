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
//import {Control} from '@angular/common';
require("../rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var inventory_service_1 = require("./inventory.service");
var supplier_service_1 = require("../supplier/supplier.service");
var table_1 = require("../other/table");
var angular2_notifications_1 = require("angular2-notifications");
var InventoryComponent = (function () {
    function InventoryComponent(inventoryService, supplierService, angularNotificationService) {
        var _this = this;
        this.inventoryService = inventoryService;
        this.supplierService = supplierService;
        this.angularNotificationService = angularNotificationService;
        this.title = 'Inventory';
        this.notificationsOptions = {
            position: ["top", "right"],
            timeOut: 5000,
            lastOnBottom: true,
            clickToClose: true
        };
        this.productNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.productIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.supplierNameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.supplierIdFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.quantityFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        this.totalCostFormControl = new forms_1.FormControl({ value: 0, disabled: true });
        this.costPriceFormControl = new forms_1.FormControl(0, [forms_1.Validators.required, forms_1.Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]);
        //configuration for table 
        this.rows = [];
        this.columns = [
            { title: 'Name', name: 'name' },
            { title: 'Selling Price', className: ['office-header', 'text-success'], name: 'current_selling_price', sort: 'asc' },
            { title: 'Cost Price.', name: 'current_cost_price', sort: 'asc' },
            { title: 'Quantity Added', className: 'text-warning', name: 'quantity' },
            { title: 'Total Quantity', name: 'total_quantity' }
        ];
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: {
                name: { filterString: '' }
            },
            className: ['table-striped', 'table-bordered']
        };
        this.customSelected = '';
        this.groupSelected = '';
        this.selected = '';
        this.asyncSelected = '';
        this.typeAheadLoading = false;
        this.typeAheadNoResults = false;
        this.dataSource = Observable_1.Observable.create(function (observer) {
            // Runs on every search
            observer.next(_this.asyncSelected);
        }).mergeMap(function (token) { return _this.getProductAsObservable(token); });
    }
    InventoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addInventoryForm = new forms_1.FormGroup({
            name: this.productNameFormControl,
            product_id: this.productIdFormControl,
            supplier: this.supplierNameFormControl,
            supplier_id: this.supplierIdFormControl,
            quantity: this.quantityFormControl,
            total_cost: this.totalCostFormControl,
            cost_price: this.costPriceFormControl
        });
        this.getInventoryList();
        this.supplierService.getSupplierList()
            .subscribe(function (suppliers) { return _this.suppliers = suppliers; }, function (error) { return _this.errorMessage = error; });
        ;
        //this.supplierComponent.suppliers;
        this.totalCostSubcribeToCostPriceChanges();
        this.totcalCostSubcribeToQuantityChanges();
    };
    InventoryComponent.prototype.ngOnChanges = function (changes) {
        console.log('onChange fired');
        console.log(changes);
    };
    InventoryComponent.prototype.totalCostSubcribeToCostPriceChanges = function () {
        var _this = this;
        // initialize stream
        var costPriceValueChanges$ = this.costPriceFormControl.valueChanges;
        // subscribe to the stream 
        costPriceValueChanges$.subscribe(function (x) { return _this.totalCostFormControl.setValue(x * _this.quantityFormControl.value); });
    };
    InventoryComponent.prototype.totcalCostSubcribeToQuantityChanges = function () {
        var _this = this;
        // initialize stream
        var quantityValueChanges$ = this.quantityFormControl.valueChanges;
        // subscribe to the stream 
        quantityValueChanges$.subscribe(function (x) { return _this.totalCostFormControl.setValue(x * _this.costPriceFormControl.value); });
    };
    InventoryComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    InventoryComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    InventoryComponent.prototype.getProductAsObservable = function (token) {
        var query = new RegExp(token, 'ig');
        console.log(this.inventories);
        return Observable_1.Observable.of(this.inventories.filter(function (inventory) {
            return query.test(inventory.name);
        }));
    };
    InventoryComponent.prototype.changeTypeAheadLoading = function (e) {
        this.typeAheadLoading = e;
    };
    InventoryComponent.prototype.changeTypeAheadNoResults = function (e) {
        this.typeAheadNoResults = e;
    };
    InventoryComponent.prototype.typeAheadOnSelectProduct = function (e) {
        this.productIdFormControl.setValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    InventoryComponent.prototype.typeAheadOnSelectSupplier = function (e) {
        this.supplierIdFormControl.setValue(e.item.id);
        console.log('Selected value: ', e.item.id);
    };
    InventoryComponent.prototype.getInventoryList = function () {
        var _this = this;
        this.inventoryService.getInventoryList()
            .subscribe(function (inventories) {
            _this.inventories = inventories,
                _this.table = new table_1.Table(_this.config, inventories, _this.columns);
        }, function (error) { return _this.errorMessage = error; });
    };
    InventoryComponent.prototype.saveInventory = function (inventory, isValid) {
        var _this = this;
        this.inventoryService.addInventory(inventory)
            .subscribe(function (status) {
            _this.getInventoryList(),
                _this.angularNotificationService.success(status.state, status.message);
        }, function (error) { return console.log(error); });
        this.getInventoryList();
        console.log(inventory, isValid);
    };
    return InventoryComponent;
}());
__decorate([
    core_1.ViewChild('childModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], InventoryComponent.prototype, "childModal", void 0);
InventoryComponent = __decorate([
    core_1.Component({
        /*selector: 'my-dashboard',*/
        templateUrl: './app/inventory/inventory.component.html',
        providers: [inventory_service_1.InventoryService, supplier_service_1.SupplierService]
    }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, supplier_service_1.SupplierService, angular2_notifications_1.NotificationsService])
], InventoryComponent);
exports.InventoryComponent = InventoryComponent;
//# sourceMappingURL=inventory.component.js.map