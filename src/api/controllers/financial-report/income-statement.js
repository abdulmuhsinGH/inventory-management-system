var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')
var moment = require('moment');

var startDate = '2017-03-01';
var endDate = '2017-06-30';
//var 

//var IncomeStatementClass = class IncomeStatement

var getTotalSalesAmount = (startDate, endDate) => {
    var result = {};
    var totalSalesAmountQuery = `select sum(transaction_logs.total_sales_amount) as total_sales_amount 
                                 from transaction_logs, sales
                                 where transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;
    return new Promise((resolve, reject) => {
        db.all(totalSalesAmountQuery, function (err, rows) {
            if (err) {
                reject("Unable to fetch data");
            }
            else {
                resolve(rows)
            }

        });

    });
   
    

    	
};


var getTotalPurchasesAmount = (startDate, endDate)=>{
    var totalPurchasesAmountQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_purchase_amount 
                                     from inventory_details
                                     where inventory_details.created_at between '${startDate}' and '${endDate}'`;

    var result = {};
    return new Promise((resolve, reject) => {
        db.all(totalPurchasesAmountQuery, function (err, rows) {
            if (err) {
                reject("Unable to fetch data");
            }
            else {
                resolve(rows)
            }

        });

    });

   	

};

var calculateGrossProfit = function (startDate, endDate) {
    var grossProfit = 0;


    getTotalSalesAmount(startDate, endDate).then((totalSalesAmount) => {
        grossProfit += Number(totalSalesAmount[0].total_sales_amount);
        return getTotalPurchasesAmount(startDate, endDate)
    }).then((totalPurchasesAmount) => {
        grossProfit = grossProfit - Number(totalPurchasesAmount[0].total_purchase_amount);

        })
    return grossProfit; 
}
  
var currentProfit = calculateGrossProfit(startDate, endDate);
console.log(currentProfit);