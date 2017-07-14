var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')
var moment = require('moment');

var startDate = '2017-03-01';
var endDate = '2017-06-30';
var incomeStatementJSON = {};
//var IncomeStatementClass = class IncomeStatement

var getQueryDataPromise = (query) => {

    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject("Unable to fetch data");
            }
            else {
                resolve(rows)
            }

        });

    });

}
var calculateTotalSalesAmount = (startDate, endDate) => {
    var result = {};
    var totalSalesAmountQuery = `select sum(transaction_logs.total_sales_amount) as total_sales_amount 
                                 from transaction_logs, sales
                                 where transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;   
   
    getQueryDataPromise(totalSalesAmountQuery).then((totalSales) => {
        console.log(totalSales);

        incomeStatementJSON["sales"] = totalSales;
    })

    	
};

var calculateTotalPurchasesAmount = (startDate, endDate)=>{
    var totalPurchasesAmountQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_purchase_amount 
                                     from inventory_details
                                     where inventory_details.created_at between '${startDate}' and '${endDate}'`;

    var result = {};
    getQueryDataPromise(totalPurchasesAmountQuery).then((totalPurchases) => {
        console.log(totalPurchases);
        incomeStatementJSON["cost_of_goods_sold"] = totalPurchases;
    });

   	

};

var calculateTotalAmountofAdditionalRecord = (startDate, endDate, record_type_id) => {
    var totalAdditionalRecordQuery = `select sum(amount) as total_amount, additional_record_type.name from additional_record_logs 
                                      join additional_record_logs on additional_record_logs.record_type_id_fk = additional_record_type.id
                                      where additional_record_logs.record_type_id_fk = ${record_type_id} and additional_record_logs.created_at between '${startDate}' and '${endDate}' group by additional_record_type.name`;

    getQueryDataPromise(totalAdditionalRecordQuery).then((totalAdditionalRecord) => {
        console.log(totalAdditionalRecordQuery);
        var recordTypeName = totalAdditionalRecord[0].name;
        incomeStatementJSON[recordTypeName] = totalAdditionalRecord[0].total_amount
    });
}

var calculateGrossProfit = () => {
    var grossProfit = 0;
    grossProit = incomeStatementJSON.sales - incomeStatementJSON.cost_of_goods_sold;

    incomeStatementJSON["gross_profit"] = grossProfit;

};

calculateTotalSalesAmount(startDate, endDate);
calculateTotalPurchasesAmount(startDate, endDate);

calculateGrossProfit()