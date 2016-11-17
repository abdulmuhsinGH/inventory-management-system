import { NgModule, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';


import * as moment from 'moment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';





@Component({
  /*selector: 'my-dashboard',*/
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app/dashboard/dashboard.component.html',
})

export class DashboardComponent implements OnInit{ 
  

	title = 'Dashboard';
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Cost'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Profit'}
  ];


  public lineChartLabels:Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };

   public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  //Data Table
  public rows:Array<any> = tableData;
  public columns:Array<any> = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {
      title: 'Position',
      name: 'username',
      sort: true,
      filtering: {filterString: '', placeholder: 'Filter by position'}
    }
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table','table-striped', 'table-bordered']
  };

  public data:Array<any> = tableData;

  public constructor() {
    this.length = this.data.length;
  }

  public ngOnInit():void {
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {

    let filteredData:Array<any> = data;
    
    console.log(this.columns);
    for (var _i = 0; _i < this.columns.length; _i++) {
    	var column = this.columns[_i];
      if (column.filtering) {
      	//console.log(filteredData);
        filteredData = filteredData.filter((item:any) => {
        		//console.log(item[column.name]);
        		if(item[column.name]){
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
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }
    };

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
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
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    console.log(filteredData);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public tabs:Array<any> = [
    {title: 'Debtors', content: 'Dynamic content 1'},
    {title: 'Creditors', content: 'Dynamic content 2'},
    
  ];

public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };
 
  public removeTabHandler(/*tab:any*/):void {
    console.log('Remove Tab handler');
  };


}

const tableData = [
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