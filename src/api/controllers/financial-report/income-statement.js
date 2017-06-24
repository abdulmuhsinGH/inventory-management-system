var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')
var moment = require('moment');

var startDate = '2017-03-01';
var endDate = '2017-06-30'

var getTotalSalesAmount = function(startDate, endDate){
	var totalSalesAmountquery =`select  sum(transaction_logs.total_sales_amount) as total_sales_amount from transaction_logs, sales where transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;

	db.all(totalSalesAmountquery, function(err, rows) {  
        
		if(err){
	  			return err;
	  		}
		else{
				console.log(rows);
	  			return rows ;
	  		}
  		
         
    });
};


var getTotalPurchasesAmount = function(startDate, endDate){
	var totalPurchasesAmountQuery =`select sum(inventory_details.cost_price * inventory_details.quantity) as total_purchase_amount from inventory_details where inventory_details.created_at between '${startDate}' and '${endDate}'`;


	db.all(totalPurchasesAmountQuery, function(err, rows) {  
        
		if(err){
	  			return err;
	  		}
		else{
				console.log(rows);
	  			return rows ;
	  		}
  		
         
    });

};

var calculateGrossProfit = function(startDate, endDate){
	var totalSalesAmount = getTotalSalesAmount(startDate, endDate);
	var totalPurchasesAmount = getTotalPurchasesAmount(startDate, endDate);

	var grossProfit = totalSalesAmount - totalPurchasesAmount;
	console.log(grossProfit);
}
  
calculateGrossProfit(startDate, endDate);
/*
console.log('Total Sales Amount:', totalSalesAmount);
console.log('Total Purchases Amount:', totalPurchasesAmount);*/

/*module.exports.getTotalSales = () => {
	// body...
	db.all("select  sum(transaction_logs.total_sales_amount) as total_sales_amount from transaction_logs, sales where transaction_logs.sales_id = sales.id and transaction_logs.created_at between '2017-03-01' and $`, function(err, rows) {  
        
		if(err){
	  			console.log(err);
	  		}
  		
         console.log(rows[0].total_sales_amount);
    });  
};
*/


/*var calculateGrossProfit = function (startDate, endDate) {
	// body...


}*/