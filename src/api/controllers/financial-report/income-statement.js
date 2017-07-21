var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')
var moment = require('moment');

var startDate = '2017-03-01';
var endDate = '2017-06-30';
var incomeStatementJSON = {};

//helper promise function get records from the DB
//@param:query
//@return Promise
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

//calculate total sales
// @param: startDate
//         endDate
//@return Promise
var calculateTotalSalesAmount = (startDate, endDate) => {
    //query to get total sales bewtween startDate and endDate
    var totalSalesAmountQuery = `select sum(transaction_logs.total_sales_amount) as total_sales_amount 
                                 from transaction_logs, sales
                                 where transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;   

    //return promise after calculating sales and storing it in the incomeStatementJSON
    return getQueryDataPromise(totalSalesAmountQuery).then((totalSales) => {

        //check if records were returned from the DB
        if (totalSales.status) {
            incomeStatementJSON["sales"] = totalSales.message[0].total_sales_amount;
 
        }
        else {//if not, log the message "no records were found"
            console.log(totalSales.message);
            return;
        }
           
        
    }).catch((error) => {//catch and log any errors encountered
        console.log(error);
    });
        	
};

//calculate total cost of goods sold
// @param: startDate
//         endDate
//@return Promise
var calculateTotalPurchasesAmount = (startDate, endDate) => {
    //query to get total cost of goods sold bewtween startDate and endDate
    var totalPurchasesAmountQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_purchase_amount 
                                     from inventory_details
                                     where inventory_details.created_at between '${startDate}' and '${endDate}'`;

    //return promise after calculating costo of goods sold and storing it in the incomeStatementJSON
    return getQueryDataPromise(totalPurchasesAmountQuery).then((totalPurchases) => {

        //check if records were returned from the DB
        if (totalPurchases.status) {
            incomeStatementJSON["cost_of_goods_sold"] = totalPurchases.message[0].total_purchase_amount;
            calculateGrossProfit();
        }
        else {//if not, log the message "no records were found"
            console.log(totalPurchases.message);
            return;
        }
            
        
    }).catch((error) => {//catch and log any errors encountered
        console.log(error);
    });

   	

};

//calculate operating income and expenses 
// @param: startDate
//         endDate
//         recordTypeId:income or expense 
//@return Promise
var calculateTotalIncomeOrExpenseAfterGrossProfit = (startDate, endDate, recordTypeId) => {
    //query to get total income or expense 
    var totalAdditionalRecordQuery = `select sum(additional_record_logs.amount) as total_amount, additional_record_type.name from additional_record_logs 
                                      join additional_record_type on additional_record_logs.record_type_id_fk = additional_record_type.id
                                      where additional_record_logs.record_type_id_fk = ${recordTypeId} and additional_record_logs.created_at between '${startDate}' and '${endDate}' group by additional_record_type.name`;

    //return a promise after calcultating total income or expense
    return getQueryDataPromise(totalAdditionalRecordQuery).then((totalAdditionalRecord) => {

        //check if records were returned from the DB
        if (totalAdditionalRecord.status) {
            var recordTypeName = totalAdditionalRecord.message[0].name;
            //check the record type is income or expense
            if (recordTypeName === "operating_income")
                incomeStatementJSON["operating_income"] = totalAdditionalRecord.message[0].total_amount;
            else if (recordTypeName === "operating_expense")
                incomeStatementJSON["operating_expense"] = totalAdditionalRecord.message[0].total_amount;    

            //calculate net profit
            calculateNetProfit();

        }
        else {//if not, log the message "no records were found"
            console.log(totalAdditionalRecord.message);
            return;
        }
        
    }).catch((error) => {//catch and log any errors encountered
        console.log(error)
    });
};

//calculate gross profit
//@return void
var calculateGrossProfit = () => {
    var grossProfit = 0;
    //substract cost of good sold from sales 
    grossProfit = incomeStatementJSON.sales - incomeStatementJSON.cost_of_goods_sold;
    //store gross profit into incomeStatementJSON
    incomeStatementJSON["gross_profit"] = grossProfit;
    
};

//calculate net profit
//@return void
var calculateNetProfit = () => {
    //check if operating income exist in the incomeStatementJSON
    var operatingIncome = (incomeStatementJSON.operating_income ? incomeStatementJSON.operating_income : 0);
    //check if operating expense exist in the incomeStatementJSON
    var operatingExpense = (incomeStatementJSON.operating_expense ? incomeStatementJSON.operating_expemse : 0);
    //subcract operating expense from operating income then add results to gross profit
    incomeStatementJSON["net_profit"] = incomeStatementJSON.gross_profit + (operatingIncome - operatingExpense);
    
};

//calculate deduction after net profit
var calculateAdditionalDeductionAfterNetProfit = () => {
    //query DB for all deduction after net profit
    deductionsAfterProfitQuery = "select additional_deduction.name, rate, amount, deduction_method.name as deduction_method from additional_deduction join deduction_method on additional_deduction.deduction_method_fk = deduction_method.id where deleted_at is null";

    //get rates 
    return getQueryDataPromise(deductionsAfterProfitQuery).then((data) => {

        if (data.status) {
            var totalAmountToDeduct = 0;

            //for each rate
            data.message.forEach((currentValue) => {
                
                //check the method of deduction fixed amount || rate of net profit 
                //then calculate rate on net profit
               // incomeStatementJSON.net_profit = 1000;
                var amount = (currentValue.amount ? currentValue.amount : (currentValue.rate * incomeStatementJSON.net_profit));
                //save rate amount into incomeStatementJSON
                var amountAndLabel = {};
                amountAndLabel[currentValue.name] = amount;
                console.log(amountAndLabel);
                incomeStatementJSON["deduction_after_net_profit"] = [amountAndLabel];
                //sum up the calculated rate 
                totalAmountToDeduct += amount;
            });

            //substract total sum rate from net profit
            //save net profit after deduction into incomeStatementJSON
            incomeStatementJSON["profit_after_deduction"] = incomeStatementJSON.net_profit - totalAmountToDeduct;
            //save total amount into incomeStatementJSON
            incomeStatementJSON["deduction_after_net_profit"].push({ total_deduction: totalAmountToDeduct });
            return incomeStatementJSON;
        }
        else {
            console.log(data.message);
            return;
        }
            
        
            

    }).catch((error) => {
        console.log(error);
    });

};

//calculate income statemment
// @param: startDate
//         endDate
//         recordTypeId:income or expense 
//@return Promise
var createIncomeStatement = (startDate, endDate, recordTypeId) => {

    return calculateTotalSalesAmount(startDate, endDate).then(() => {
        return calculateTotalPurchasesAmount(startDate, endDate);
    }).then(() => {
        return calculateTotalIncomeOrExpenseAfterGrossProfit(startDate, endDate, recordTypeId);
    }).then(() => {
        return calculateAdditionalDeductionAfterNetProfit();
    }).then(() => {
       return incomeStatementJSON
    }).catch((error) => { console.log(error); });

};

//module.exports.generateIncomeStatement = createIncomeStatement(startDate, endDate, recordTypeId)
//createIncomeStatement(startDate, endDate, 1).then((incomeStatement) => {
//    console.log(incomeStatement);
//});
