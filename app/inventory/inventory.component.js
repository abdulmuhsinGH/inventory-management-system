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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var InventoryComponent = (function () {
    function InventoryComponent() {
        var _this = this;
        this.stateCtrl = new forms_1.FormControl();
        this.myForm = new forms_1.FormGroup({
            state: this.stateCtrl
        });
        this.title = 'Inventory';
        this.customSelected = '';
        this.groupSelected = '';
        this.selected = '';
        this.asyncSelected = '';
        this.typeaheadLoading = false;
        this.typeaheadNoResults = false;
        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
            'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
            'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico',
            'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
            'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington',
            'West Virginia', 'Wisconsin', 'Wyoming'];
        this.statesComplex = [
            { id: 1, name: 'Alabama', region: 'South' }, { id: 2, name: 'Alaska', region: 'West' }, { id: 3, name: 'Arizona', region: 'West' },
            { id: 4, name: 'Arkansas', region: 'South' }, { id: 5, name: 'California', region: 'West' },
            { id: 6, name: 'Colorado', region: 'West' }, { id: 7, name: 'Connecticut', region: 'Northeast' },
            { id: 8, name: 'Delaware', region: 'South' }, { id: 9, name: 'Florida', region: 'South' },
            { id: 10, name: 'Georgia', region: 'South' }, { id: 11, name: 'Hawaii', region: 'West' },
            { id: 12, name: 'Idaho', region: 'West' }, { id: 13, name: 'Illinois', region: 'Midwest' },
            { id: 14, name: 'Indiana', region: 'Midwest' }, { id: 15, name: 'Iowa', region: 'Midwest' },
            { id: 16, name: 'Kansas', region: 'Midwest' }, { id: 17, name: 'Kentucky', region: 'South' },
            { id: 18, name: 'Louisiana', region: 'South' }, { id: 19, name: 'Maine', region: 'Northeast' },
            { id: 21, name: 'Maryland', region: 'South' }, { id: 22, name: 'Massachusetts', region: 'Northeast' },
            { id: 23, name: 'Michigan', region: 'Midwest' }, { id: 24, name: 'Minnesota', region: 'Midwest' },
            { id: 25, name: 'Mississippi', region: 'South' }, { id: 26, name: 'Missouri', region: 'Midwest' },
            { id: 27, name: 'Montana', region: 'West' }, { id: 28, name: 'Nebraska', region: 'Midwest' },
            { id: 29, name: 'Nevada', region: 'West' }, { id: 30, name: 'New Hampshire', region: 'Northeast' },
            { id: 31, name: 'New Jersey', region: 'Northeast' }, { id: 32, name: 'New Mexico', region: 'West' },
            { id: 33, name: 'New York', region: 'Northeast' }, { id: 34, name: 'North Dakota', region: 'Midwest' },
            { id: 35, name: 'North Carolina', region: 'South' }, { id: 36, name: 'Ohio', region: 'Midwest' },
            { id: 37, name: 'Oklahoma', region: 'South' }, { id: 38, name: 'Oregon', region: 'West' },
            { id: 39, name: 'Pennsylvania', region: 'Northeast' }, { id: 40, name: 'Rhode Island', region: 'Northeast' },
            { id: 41, name: 'South Carolina', region: 'South' }, { id: 42, name: 'South Dakota', region: 'Midwest' },
            { id: 43, name: 'Tennessee', region: 'South' }, { id: 44, name: 'Texas', region: 'South' },
            { id: 45, name: 'Utah', region: 'West' }, { id: 46, name: 'Vermont', region: 'Northeast' },
            { id: 47, name: 'Virginia', region: 'South' }, { id: 48, name: 'Washington', region: 'South' },
            { id: 49, name: 'West Virginia', region: 'South' }, { id: 50, name: 'Wisconsin', region: 'Midwest' },
            { id: 51, name: 'Wyoming', region: 'West' }];
        this.dataSource = Observable_1.Observable.create(function (observer) {
            // Runs on every search
            observer.next(_this.asyncSelected);
        }).mergeMap(function (token) { return _this.getStatesAsObservable(token); });
    }
    InventoryComponent.prototype.showChildModal = function () {
        this.childModal.show();
    };
    InventoryComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    InventoryComponent.prototype.getStatesAsObservable = function (token) {
        var query = new RegExp(token, 'ig');
        return Observable_1.Observable.of(this.statesComplex.filter(function (state) {
            return query.test(state.name);
        }));
    };
    InventoryComponent.prototype.changeTypeaheadLoading = function (e) {
        this.typeaheadLoading = e;
    };
    InventoryComponent.prototype.changeTypeaheadNoResults = function (e) {
        this.typeaheadNoResults = e;
    };
    InventoryComponent.prototype.typeaheadOnSelect = function (e) {
        console.log('Selected value: ', e.value);
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], InventoryComponent.prototype, "childModal", void 0);
    InventoryComponent = __decorate([
        core_1.Component({
            /*selector: 'my-dashboard',*/
            templateUrl: './app/inventory/inventory.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], InventoryComponent);
    return InventoryComponent;
}());
exports.InventoryComponent = InventoryComponent;
//# sourceMappingURL=inventory.component.js.map