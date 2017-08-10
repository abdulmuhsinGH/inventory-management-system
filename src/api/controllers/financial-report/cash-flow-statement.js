var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('../../../../inventory_db.db');

var moment = require('moment');
var numeral = require('numeral');
var operatingActivitiesJSON = {};


var startDate = '2017-03-01';
var endDate = '2017-06-30';
//helper function get data from DB
var getQueryDataPromise = (query) => {

    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }
            else if (rows.length < 1) {
                resolve({ status: 0, message: "No records available" })
            }
            else {
                resolve({ status: 1, message: rows })
            }


        });

    });

}

var getPreviousDates = (currentStartDate, currentEndDate) => {
    //get the previous period start and end dates using the current start and end dates 
    var startDate = moment(currentStartDate);
    var endDate = moment(currentEndDate);
    var numOfDaysBtwnStartEnd = startDate.diff(endDate);
    var previousPeriodStartDate = startDate.subtract(numOfDaysBtwnStartEnd, 'days');
    var previousPeriodEndDate = endDate.subtract(numOfDaysBtwnStartEnd, 'days');

    return { previousPeriodStartDate, previousPeriodEndDate}
}

var format = (amount) =>{
   return numeral(amount).format('(0.00)');
}

var add = (amount, amountToBeAdded) =>{
    var result = numeral(amount).add(amountToBeAdded);

    return format(result);
}

var subtract = (amount, amountToBeSubtracted) =>{
    
    var result = numeral(amount).subtract(amountToBeSubtracted);
    console.log(result);
    return format(result._value);
}

//calculate cash collection from sales
var calculateCashCollectionFromSales = (startDate, endDate) => {

    //total debtors current period --local variable
    var totalAmountDebtorsCurrentPeriod = 0;
    //total debtors previous period
    var totalAmountDebtorsPreviousPeriod = 0;
    //get total cash sales for the period between startDate and endDate
    var totalCashSalesAmountQuery = `select sum(transaction_logs.total_sales_amount) as total_cash_sales_amount 
                                 from transaction_logs, sales
                                 where sales.sales_type_fk = 2 and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;

    //get the previous period start and end dates using the current start and end dates
    var previousDates = getPreviousDates(startDate,endDate);
    
    //query for the total debtors for the current period 
    var currentPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_current_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;
    //query for the total debtors for the previous period
    var previousPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_previous_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${previousDates.previousPeriodStartDate}' and '${previousDates.previousPeriodEndDate}'`;

    //get cash collection from sales for the period between  startDate and endDate:
   return getQueryDataPromise(totalCashSalesAmountQuery).then((totalCashSales) => {
        //check if records were returned from the DB
        if (totalCashSales.status) {
            operatingActivitiesJSON["cash_sales"] = format(totalCashSales.message[0].total_cash_sales_amount);

        }
        else {//if not, log the message "no records were found"
            console.log(totalCashSales.message);
            return;
        }
        //get the total debtors for the current period 
        return getQueryDataPromise(currentPeriodTotalDebtorsQuery)

    }).then((totalDebtorsCurrentPeriod) => {
        //check if records were returned from the DB
        if (totalDebtorsCurrentPeriod.status) {
            totalAmountDebtorsCurrentPeriod = totalDebtorsCurrentPeriod.message[0].total_current_debtors
            console.log(totalDebtorsCurrentPeriod);
        }
        else {//if not, log the message "no records were found"
            console.log(totalDebtorsCurrentPeriod.message);
            return;
        }
         //get the total debtors for the previous period 
        return getQueryDataPromise(previousPeriodTotalDebtorsQuery);

    }).then((totalDebtorsPreviousPeriod) => {
        var cashSalesAfterChangeInDebtors;
        //subtract the previous period total debtors from the current period total debtors
        var changeInDebtors = totalAmountDebtorsCurrentPeriod - totalDebtorsPreviousPeriod.message[0].total_previous_debtors;
        //if the amount is a positive number 
        if (changeInDebtors >= 0) {
            operatingActivitiesJSON["change_in_debtors"] = format(-Math.abs(changeInDebtors));
            //then subtract the absolute value of the amount from the total cash sales
             //store the final amount as cash collection from sales 
            operatingActivitiesJSON["cash_collection_from_sales"]  = add((operatingActivitiesJSON["cash_sales"]), Math.abs(changeInDebtors));

            //store the final amount as cash collection from sales 
           /* operatingActivitiesJSON["cash_collection_from_sales"] = format(cashSalesAfterChangeInDebtors);*/
        }
        //else if it is a negative number 
        else {
            operatingActivitiesJSON["change_in_debtors"] = format(Math.abs(changeInDebtors));
            //add the absolute value of the amount to the total cash sales
            operatingActivitiesJSON["cash_collection_from_sales"] = add((operatingActivitiesJSON["cash_sales"]),Math.abs(changeInDebtors));

            //store the final amount as cash collection from sales 
            //operatingActivitiesJSON["cash_collection_from_sales"] = format(cashSalesAfterChangeInDebtors);
        }
    }).catch((error) => {//catch and log any errors encountered
        console.log(error);
    });

}       


//calculate cash payment to suppliers
var calculateCashPaymentToSuppliers = (startDate, endDate) => {
    //current total creditors -- local variable
    var totalAmountCurrentCreditors;
    //previous total creditors -- local variable
    var totalAmountPreviousCreditors;

    var cashPurchasesAfterChangeInCreditors;


    //get total cash purchases for the period between startDate and endDate
    var totalCashPurchasesQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_cash_purchase_amount 
                                     from inventory_details
                                     where inventory_details.inventory_purchase_type_fk = 2 and inventory_details.created_at between '${startDate}' and '${endDate}'`;

    //get the number of days between start date and end date
    var previousDates = getPreviousDates(startDate,endDate);
    
    //query for the total creditors for the current period 
    var currentPeriodTotalCreditorsQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_current_creditors 
                                from inventory_details
                                where inventory_details.inventory_purchase_type_fk = 1 and inventory_details.created_at between '${startDate}' and '${endDate}'`;
    //query for the total creditors for the previous period
    var previousPeriodTotalCreditorsQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_previous_creditors 
                                from inventory_details
                                where inventory_details.inventory_purchase_type_fk = 1 and inventory_details.created_at between '${previousDates.previousPeriodStartDate}' and '${previousDates.previousPeriodEndDate}'`;

    //get increase/decrease in debtors for the period between  startDate and endDate:
    return getQueryDataPromise(totalCashPurchasesQuery).then((totalCashPurchases) => {

        if (totalCashPurchases.status) {
            operatingActivitiesJSON["cash_purchases"] = format(totalCashPurchases.message[0].total_cash_purchase_amount);
        }

        else {
            console.log(totalCashPurchases);
            return;
        }

        //get the total creditors for the current period 
        return getQueryDataPromise(currentPeriodTotalCreditorsQuery);
    }).then((totalCurrentCreditors) => {
        if (totalCurrentCreditors.status) {
            totalAmountCurrentCreditors = totalCurrentCreditors.message[0].total_current_creditors;
        }
        else {
            console.log(totalCurrentCreditors);
            return;
        }

        //get the total creditors for the previous period 
        return getQueryDataPromise(previousPeriodTotalCreditorsQuery);    
    }).then((totalPreviousCreditors) => {
        if (totalPreviousCreditors.status) {
            totalAmountPreviousCreditors = totalPreviousCreditors.message[0].total_previous_creditors;

            //subtract the previous total creditors from the current total creditors
            var changeInCreditors = totalAmountCurrentCreditors - totalAmountPreviousCreditors;
            //if the amount is a positive number
            if (changeInCreditors >= 0) {
                operatingActivitiesJSON["change_in_creditors"] = format(changeInCreditors);
                //then add the amount to the total cash purchases
                operatingActivitiesJSON["cash_payment_to_suppliers"] = add(operatingActivitiesJSON["cash_purchases"], Math.abs(changeInCreditors));

                //store the final amount as cash collection from sales 
                //operatingActivitiesJSON["cash_payment_to_suppliers"] = cashPurchasesAfterChangeInCreditors = operatingActivitiesJSON["cash_purchases"] + changeInCreditors;
            }
            //else if it is a negative number 
            else {
                operatingActivitiesJSON["change_in_creditors"] = format(changeInCreditors);
                //subtract the absolute value of the amount to the total cash sales 
                operatingActivitiesJSON["cash_payment_to_suppliers"] = subtract(operatingActivitiesJSON["cash_purchases"], Math.abs(changeInCreditors));

                //store final amount as cash payment to suppliers
                //operatingActivitiesJSON["cash_payment_to_suppliers"] = cashSalesAfterChangeInDebtors;
            }
        

        }
        else {

            console.log(totalPreviousCreditors)
           // return;
        }


    }).catch((error) => {//catch and log any errors encountered
            console.log(error);
    });
             
}
        

//calculateOtherIncomeAndExpenses
var calculateOtherIncomeAndExpenses = (startDate, endDate, calculationTypeId) => {
    //currentPeriodTotalIncomeAmount -- local variable
    var currentPeriodTotalIncomeAmount = 0;
    //previousPeriodTotalIncomeAmount -- local variable
    var previousPeriodTotalIncomeAmount = 0;
    //currentPeriodTotalExpenseAmount -- local variable
    var currentPeriodTotalExpenseAmount = 0;
    //previousPeriodTotalExpenseAmount -- local variable
    var previousPeriodTotalExpenseAmount = 0;
    
    //query for total income/expense for current period
    var totalIncomeOrExpenseCurrentPeriodQuery = `select sum(additional_record_logs.amount) as total_amount, additional_record_type.name from additional_record_logs 
    join additional_record_type on additional_record_logs.record_type_id_fk = additional_record_type.id
    where additional_record_logs.record_type_id_fk = ${calculationTypeId} and additional_record_logs.created_at between '${startDate}' and '${endDate}' group by additional_record_type.name`;

    //get the previous period dates using the current start date and end date
    var previousDates = getPreviousDates(startDate,endDate);

    //query for total income/expense for previous period
    var totalIncomeOrExpensePreviousPeriodQuery = `select sum(additional_record_logs.amount) as total_amount, additional_record_type.name from additional_record_logs 
    join additional_record_type on additional_record_logs.record_type_id_fk = additional_record_type.id
    where additional_record_logs.record_type_id_fk = ${calculationTypeId} and additional_record_logs.created_at between '${previousDates.previousPeriodStartDate}' and '${previousDates.previousPeriodEndDate}' group by additional_record_type.name`;
    //if it is income then
    if (calculationTypeId === 1) {
        //get increase/decrease in income between startDate and endDate
        //get total income for the current period
       return getQueryDataPromise(totalIncomeOrExpenseCurrentPeriodQuery).then((totalCurrentIncomeAmount) => {
            if (totalCurrentIncomeAmount.status) {
                currentPeriodTotalIncomeAmount = totalCurrentIncomeAmount.message[0].total_amount;
            }
            else {
                console.log(totalCurrentIncomeAmount.message);
            }

            //get total income for the current period
            return getQueryDataPromise(totalIncomeOrExpensePreviousPeriodQuery);
        }).then((totalPreviousIncomeAmount) => {

            if (totalPreviousIncomeAmount.status) {
                previousPeriodTotalIncomeAmount = totalPreviousIncomeAmount.message[0].total_amount;

                //substract the previous period total income from the current period total income
                var changeInIncome = currentPeriodTotalIncomeAmount - previousPeriodTotalIncomeAmount;
                //if the amount is a positive number
                if (changeInIncome >= 0) {
                    //then store as income inflow (positive)
                    operatingActivitiesJSON["other_income"] = format(changeInIncome);

                }
                //if the amount is a negative number 
                else {
                    //then store it as income outflow(negative)
                    operatingActivitiesJSON["other_income"] = format(changeInIncome);
                }  
                
                
            }
            else {
                operatingActivitiesJSON["other_income"] = format(0);
                console.log(totalPreviousIncomeAmount.message);
            }

        }).catch((error) => {
            console.log(error);             
        })
        
    }
    //if it is expense then
    else if (calculationTypeId === 2) {
        //get the total expense for the current period
        return getQueryDataPromise(totalIncomeOrExpenseCurrentPeriodQuery).then((totalCurrentExpenseAmount) => {
            if(totalCurrentExpenseAmount.status) {
                currentPeriodTotalExpenseAmount = totalCurrentExpenseAmount.message[0].total_amount;
            }
            else {
                console.log(totalCurrentExpenseAmount.message);
            }

            //get the total expense for the previous period
            return getQueryDataPromise(totalIncomeOrExpensePreviousPeriodQuery);
        }).then((totalPreviousExpenseAmount) => {

            if (totalPreviousExpenseAmount.status) {
                previousPeriodTotalExpenseAmount = totalPreviousExpenseAmount.message[0].total_amount;
                 //substract the previous period total expense from the current period expense
                changeInExpense = currentPeriodTotalExpenseAmount - previousPeriodTotalExpenseAmount;

                //if the amount is a positive number
         
                if (changeInExpense >= 0) {
                    //then store as expense outflow (negative)
                    operatingActivitiesJSON["other_expense"] = format(-Math.abs(changeInExpense));
                }
                 //else if the amount is a negative number 
                else {
                    //then store it as expense inflow(positive)
                    operatingActivitiesJSON["other_expense"] = format(Math.abs(changeInExpense));
                }
            }
            else {

                operatingActivitiesJSON["other_expense"] = format(0);
                console.log(totalPreviousExpenseAmount.message);
            }
        })
    }
      
}


//calculate net cash from operating activities
var calculateNetCashFromOperatingActivites = () => {
    var cashFromTradingActivities = subtract(operatingActivitiesJSON.cash_collection_from_sales, operatingActivitiesJSON.cash_payment_to_suppliers);
    
    var netCashFromOperatingActivites = add(cashFromTradingActivities,add(operatingActivitiesJSON.other_income, operatingActivitiesJSON.other_expense));
    //console.log( operatingActivitiesJSON.other_income)
    operatingActivitiesJSON["net_cash_from_operating_income"] = netCashFromOperatingActivites;
}

//calculate cash from operating activities
//Generate a Cash flow statement
var generateCashFlowStatement = async (startDate, endDate) => {
    try {
        await calculateCashCollectionFromSales(startDate, endDate);
        await calculateCashPaymentToSuppliers(startDate, endDate);
        await calculateOtherIncomeAndExpenses(startDate, endDate, 1);
        await calculateOtherIncomeAndExpenses(startDate, endDate, 2);
        await calculateNetCashFromOperatingActivites();

        return operatingActivitiesJSON;
    }
    catch (error) {
        console.log(error);
    }
    
    
}


module.exports.generateCashFlowStatement = (body)=>{

   var cashFlowStatement =generateCashFlowStatement(body.startDate, body.endDate);


   db.serialize(function () {
      var stmt = db.prepare('INSERT INTO cashflow_statements(title, cashflow_statement, created_at, updated_at) VALUES (?, ?, ?, ?)');
      var date = new Date(); 
      var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
      var currentDateTime = formattedDate.toLocaleString();


        stmt.run(body.title, cashFlowStatement, currentDateTime, currentDateTime);

        stmt.finalize(function(err){
            console.log(err);
            if(err){
               return {status:500, message:err}
            }
            else{
                return {status:201, message:{state: 'success', user: null, message: "Cashflow Statement Saved", statement:cashFlowStatement}}                
            }
        } )

      
    });

};


module.exports.getAllCashFlowStatements = () =>{

    db.all("SELECT id, title FROM cashflow_statements", function(err, rows) {  
        
        if(err){
            return {status:500, message:err}
        }
        else if(!rows){
            return {status:200, message:{state: 'success', user: null, result: "No Cashflow Statements Found"}};

        }
        else{
            
            return {status(200),message:{state: 'success', user: null, result: rows}};
        }
       
    });  
    
}
module.exports.getACashFlowStatement = (cashFlowStatementId) =>{
    db.get(`SELECT title, cashflow_statement FROM cashflow_statements WHERE id = ${cashFlowStatementId}` , function(err, row) {  
        
        if(err){
            return {status: 500, message:err};
        }
        else if(row.length<1){
            return {status: 200, message:{state: 'success', user: null, result: "No Cashflow Statement Found"}};

        }
        else{
            
            return {status: 200, message:{state: 'success', user: null, result: row}};
        }
        
    }); 
}

module.exports.filterCashFlowStatement = (searchTerm) =>{
     db.all(`SELECT id, title FROM cashflow_statements where cashflow_statements.title like '%"${searchTerm}"%'`, function(err, rows) {  
        
        if(err){
            return {status:500, message:err}
        }
        else if(rows.lenght<1){
            return {status:200, message:{state: 'success', user: null, result: "No Cashflow Statements Found"}};

        }
        else{
            
            return {status:200, message:{state: 'success', user: null, result: rows}};
        }
       
    });
}


//On Hiatus
 //calculate investing activities
   //how to determine an inflow or outflow in investing activities
   // add get proceeeds form sale of assets(inflow) -- add to 
   //subtract purchase of assets (outflow)

//calculate financing activities
   //how to determine an inflow or outflow in financing activities
   // add get proceeeds form sale of assets(inflow) -- add to 
   //subtract purchase of assets (outflow)


        