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
//import { TabsetConfig } from 'ng2-bootstrap';
//import { PaginationConfig } from 'ng2-bootstrap/pagination';
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.title = 'Dashboard';
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Cost' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Profit' }
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
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        //Data Table
        this.rows = tableData;
        this.columns = [
            { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
            {
                title: 'Position',
                name: 'username',
                sort: true,
                filtering: { filterString: '', placeholder: 'Filter by position' }
            }
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table', 'table-striped', 'table-bordered']
        };
        this.data = tableData;
        this.tabs = [
            { title: 'Debtors', content: 'Dynamic content 1' },
            { title: 'Creditors', content: 'Dynamic content 2' },
        ];
        this.length = this.data.length;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.onChangeTable(this.config);
    };
    DashboardComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    DashboardComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    DashboardComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        console.log(this.columns);
        for (var _i = 0; _i < this.columns.length; _i++) {
            var column = this.columns[_i];
            if (column.filtering) {
                //console.log(filteredData);
                filteredData = filteredData.filter(function (item) {
                    //console.log(item[column.name]);
                    if (item[column.name]) {
                        //console.log(item[column.name] + " 1");
                        return item[column.name].match(column.filtering.filterString);
                    }
                });
                console.log(filteredData);
            }
            if (!config.filtering) {
                return filteredData;
            }
            if (config.filtering.columnName) {
                return filteredData.filter(function (item) {
                    return item[config.filtering.columnName].match(_this.config.filtering.filterString);
                });
            }
        }
        ;
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().match(_this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        console.log(filteredData);
        return filteredData;
    };
    DashboardComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        console.log(filteredData);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    DashboardComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    DashboardComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    DashboardComponent.prototype.removeTabHandler = function () {
        console.log('Remove Tab handler');
    };
    ;
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        /*selector: 'my-dashboard',*/
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        templateUrl: './app/dashboard/dashboard.component.html',
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
var tableData = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 2,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 3,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 4,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 5,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 6,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 7,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 8,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 9,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 10,
        name: "Leanne Graham",
        username: "Bret",
    },
    {
        id: 11,
        name: "Nicholas DuBuque",
        username: "Nicholas.Stanton"
    }
];
//# sourceMappingURL=dashboard.component.js.map