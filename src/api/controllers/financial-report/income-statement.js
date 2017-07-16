var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')
var moment = require('moment');

var startDate = '2017-03-01';
var endDate = '2017-06-30';
var incomeStatementJSON = {};

var getQueryDataPromise = (query) => {

    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length < 1) {
                resolve({status:0, message: "No records available"})
            }
            else {
                resolve({ status: 1, message: rows })
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
         //console.log(totalSales);
        result = totalSales;
        if (totalSales.status) {
            incomeStatementJSON["sales"] = totalSales.message[0].total_sales_amount;
        }
        else
            console.log(totalSales.message);
        
    }).catch((error) => {
        console.log(error);
    });

    return new Promise((resolve, reject) => {
        if (result.status)
            resolve(result);
        else
            reject(result.message);
    });
    	
};

var calculateTotalPurchasesAmount = (startDate, endDate)=>{
    var totalPurchasesAmountQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_purchase_amount 
                                     from inventory_details
                                     where inventory_details.created_at between '${startDate}' and '${endDate}'`;

    var result = {};
    getQueryDataPromise(totalPurchasesAmountQuery).then((totalPurchases) => {
       // console.log(totalPurchases);
        if (totalPurchases.status) {
            incomeStatementJSON["cost_of_goods_sold"] = totalPurchases.message[0].total_purchase_amount;
            calculateGrossProfit();
           // console.log(incomeStatementJSON);
        }
        else
            totalPurchases.message;
        
    }).catch((error) => {
        console.log(error);
    });

   	

};

var calculateTotalIncomeOrExpenseAfterGrossProfit = (startDate, endDate, recordTypeId) => {
    var totalAdditionalRecordQuery = `select sum(additional_record_logs.amount) as total_amount, additional_record_type.name from additional_record_logs 
                                      join additional_record_type on additional_record_logs.record_type_id_fk = additional_record_type.id
                                      where additional_record_logs.record_type_id_fk = ${recordTypeId} and additional_record_logs.created_at between '${startDate}' and '${endDate}' group by additional_record_type.name`;

    getQueryDataPromise(totalAdditionalRecordQuery).then((totalAdditionalRecord) => {
       // console.log(totalAdditionalRecord);
        if (totalAdditionalRecord.status) {
            var recordTypeName = totalAdditionalRecord.message[0].name;
            if (totalAdditionalRecord.message[0].name === "operating_income")
                incomeStatementJSON["operating_income"] = totalAdditionalRecord.message[0].total_amount;
            else if (totalAdditionalRecord.message[0].type === "operating_expense")
                incomeStatementJSON["operating_expense"] = totalAdditionalRecord.message[0].total_amount;    

            calculateNetProfit();
            

        }
        else {
            console.log(totalAdditionalRecord.message);
        }
        
    }).catch((error) => {
        console.log(error)
    });
};

var calculateGrossProfit = () => {
    var grossProfit = 0;
    grossProfit = incomeStatementJSON.sales - incomeStatementJSON.cost_of_goods_sold;
    incomeStatementJSON["gross_profit"] = grossProfit;

};

var calculateNetProfit = () => {

    var operatingIncome = (incomeStatementJSON.operating_income ? incomeStatementJSON.operating_income : 0);
    var operatingExpense = (incomeStatementJSON.operating_expense ? incomeStatementJSON.operating_expemse : 0);
    incomeStatementJSON.net_profit = incomeStatementJSON.gross_profit + (operatingIncome - operatingExpense);
};

var calculateAdditionalDeductionAfterNetProfit = () => {
    deductionsAfterProfitQuery = "select additional_deduction.name, rate, amount, deduction_method.name as deduction_method from additional_deduction join deduction_method on additional_deduction.deduction_method_fk = deduction_method.id where deleted_at is null";

    //get rates 
    getQueryDataPromise(deductionsAfterProfitQuery).then((data) => {

        if (data.status) {
            var totalAmountToDeduct = 0;

            //for each rate
            data.message.forEach((currentValue) => {
                
                //check the method of deduction fixed amount || rate of net profit 
                //then calculate rate on net profit
               // incomeStatementJSON.net_profit = 1000;
                var amount = (currentValue.amount ? currentValue.amount : (currentValue.rate * incomeStatementJSON.net_profit));
                //save rate amount into incomeStatementJSON
                var amountLabel = currentValue.name;
                incomeStatementJSON["deduction_after_net_profit"] = { amountLabel:amount };
                //sum up the calculated rate 
                totalAmountToDeduct += amount;
            });

            //substract total sum rate from net profit
            //save net profit after deduction into incomeStatementJSON
            incomeStatementJSON["profit_after_deduction"] = incomeStatementJSON.net_profit - totalAmountToDeduct;
            //save total amount into incomeStatementJSON
            incomeStatementJSON["deduction_after_net_profit"] = { total_deduction: totalAmountToDeduct };
            console.log(incomeStatementJSON);
        }
        else {
            console.log(data.message);
        }
            
        
            

    }).catch((error) => {
        console.log(error);
    });

};

module.exports.generateIncomeStatement = (req, res) => {

}

calculateTotalSalesAmount(startDate, endDate);
calculateTotalPurchasesAmount(startDate, endDate);
calculateTotalIncomeOrExpenseAfterGrossProfit(startDate,endDate,1);
calculateAdditionalDeductionAfterNetProfit();