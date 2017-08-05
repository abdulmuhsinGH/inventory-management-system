var moment = require('moment');
var numeral = require('numeral');
var operatingActivitiesJSON = {};

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

//Generate a Cash flow statement


//calculate cash from operating activities

//calculate cash collection from sales
var calculateCashCollectionFromSales = (startDate, endDate) => {
    //get total cash sales for the period between startDate and endDate
    var totalCashSalesAmountQuery = `select sum(transaction_logs.total_sales_amount) as total_cash_sales_amount 
                                 from transaction_logs, sales
                                 where sales.sales_type_fk = 2 and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;

    //get the number of days between start date and end date
    var currentStartDate = moment(startDate);
    var currentEndDate = moment(endDate);
    var numOfDaysBtwnStartEnd = currentStartDate.diff(currentEndDate);
    var previousPeriodStartDate = currentStartDate.subtract(numOfDaysBtwnStartEnd, 'days');
    var previousPeriodEndDate = currentEndDate.subtract(numOfDaysBtwnStartEnd, 'days');

    //query for the total debtors for the current period 
    var currentPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_current_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;
    //query for the total debtors for the previous period
    var previousPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_previous_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${previousPeriodStartDate}' and '${previousPeriodEndDate}'`;

    //get cash collection from sales for the period between  startDate and endDate:
    getQueryDataPromise(totalCashSalesAmountQuery).then((totalCashSales) => {
        //check if records were returned from the DB
        if (totalCashSales.status) {
            operatingActivitiesJSON["Cash_Sales"] = totalCashSales.message[0].total_cash_sales_amount;

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
        var changeInDebtors = totalDebtorsCurrentPeriod.message[0].total_current_debtors - totalDebtorsPreviousPeriod.message[0].total_previous_debtors;
        //if the amount is a positive number 
        if (changeInDebtors >= 0) {
            operatingActivitiesJSON["change_in_debtors"] = numeral(-Math.abs(changeInDebtors)).format('(0,0.00)');
            //then subtract the absolute value of the amount from the total cash sales
            cashSalesAfterChangeInDebtors = operatingActivitiesJSON["Cash_Sales"] - Math.abs(changeInDebtors);

            //store the final amount as cash collection from sales 
            operatingActivitiesJSON["cash_collection_from_sales"] = cashSalesAfterChangeInDebtors;
        }
        //else if it is a negative number 
        else {
            operatingActivitiesJSON["change_in_debtors"] = numeral(Math.abs(changeInDebtors)).format('(0,0.00)');
            //add the absolute value of the amount to the total cash sales
            cashSalesAfterChangeInDebtors = operatingActivitiesJSON["Cash_Sales"] + Math.abs(changeInDebtors);

            //store the final amount as cash collection from sales 
            operatingActivitiesJSON["cash_collection_from_sales"] = cashSalesAfterChangeInDebtors;
        }
    }).catch((error) => {//catch and log any errors encountered
        console.log(error);
    });

}       
        
            
            
            


    //calculate cash payment to suppliers
var cashPaymentToSuppliers = (startDate, endDate) => {
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
    var currentStartDate = moment(startDate);
    var currentEndDate = moment(endDate);
    var numOfDaysBtwnStartEnd = currentStartDate.diff(currentEndDate);
    var previousPeriodStartDate = currentStartDate.subtract(numOfDaysBtwnStartEnd, 'days');
    var previousPeriodEndDate = currentEndDate.subtract(numOfDaysBtwnStartEnd, 'days');

    //query for the total creditors for the current period 
    var currentPeriodTotalCreditorsQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_current_creditors 
                                from inventory_details
                                where inventory_details.inventory_purchase_type_fk = 1 and inventory_details.created_at between '${startDate}' and '${endDate}'`;
    //query for the total creditors for the previous period
    var previousPeriodTotalCreditorsQuery = `select sum(inventory_details.cost_price * inventory_details.quantity) as total_previous_creditors 
                                from inventory_details
                                where inventory_details.inventory_purchase_type_fk = 1 and inventory_details.created_at between '${previousPeriodStartDate}' and '${previousPeriodEndDate}'`;

    //get increase/decrease in debtors for the period between  startDate and endDate:
    getQueryDataPromise(totalCashPurchasesQuery).then((totalCashPurchases) => {

        if (totalCashPurchases.status) {
            operatingActivitiesJSON["Cash_Purchases"] = totalCashSales.message[0].total_cash_sales_amount;
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
        return getQueryDataPromise(previousPeriodCreditorsQuery);    
    }).then((totalPreviousCreditors) => {
        if (totalPreviousCreditors.status) {
            totalAmountPreviousCreditors = totalPreviousCreditors.message[0].total_previous_creditors;

            //subtract the previous total creditors from the current total creditors
            var changeInCreditors = totalAmountCurrentCreditors - totalAmountPreviousCreditors;
            //if the amount is a positive number
            if (changeInCreditors >= 0) {
                operatingActivitiesJSON["change_in_creditors"] = numeral(changeInCreditors).format('(0,0.00)');
                //then add the amount to the total cash purchases
                cashPurchasesAfterChangeInCreditors = operatingActivitiesJSON["Cash_Purchases"] + Math.abs(changeInCreditors);

                //store the final amount as cash collection from sales 
                operatingActivitiesJSON["cash_payment_to_suppliers"] = cashPurchasesAfterChangeInCreditors = operatingActivitiesJSON["Cash_Purchases"] + changeInCreditors;
            }
            //else if it is a negative number 
            else {
                operatingActivitiesJSON["change_in_creditors"] = numeral(changeInCreditors).format('(0,0.00)');
                //subtract the absolute value of the amount to the total cash sales 
                cashPurchasesAfterChangeInCreditors = operatingActivitiesJSON["Cash_Purchases"] - Math.abs(changeInCreditors);

                //store final amount as cash payment to suppliers
                operatingActivitiesJSON["cash_payment_to_suppliers"] = cashSalesAfterChangeInDebtors;
            }
        

        }
        else {
            console.log(totalPreviousCreditors)
            return;
        }


    }).catch((error) => {//catch and log any errors encountered
            console.log(error);
    });
             
}
        


    //calculateOtherIncomeAndExpenses
var calcualteOtherIncomeAndExpenses = (startDate, endDate, calculationType) => {
    //check the the calculation to do
    
    //query for total income for current period
    var totalIncomeOrExpenseCurrentperiodQuery 

    //if it is income then
    if (calculationType === "income") {

         
        //query for total income for previous period

        //get increase/decrease in income between startDate and endDate
        //get total income between the period of startDate and endDate

        //

    }
     
      //get increase/decrease in income between startDate and endDate
      //get total income between the period of startDate and endDate
      //get total income between the previous start date(this is derived using the number of days between the current start date and current end date) and previous end date
      //substract the previous total incomefro mthe current income
      //if the amount is a positive number
         //then store as income inflow (positive)
      //if the amount is a negative number 
        //.then store it as income outflow(negative)
    //else if it is expense
      //get increase/decrease in expense between startDate and endDate
      //get total expense between the period of startDate and endDate
      //get total expense between the previous start date(this is derived using the number of days between the current start date and current end date) and previous end date
      //substract the previous total expense from the current expense
      //if the amount is a positive number
         //then store as expense outflow (negative)
      //if the amount is a negative number 
        //then store it as expense inflow(positive)
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


        