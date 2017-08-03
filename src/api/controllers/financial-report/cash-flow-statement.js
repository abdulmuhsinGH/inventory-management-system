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
    var previousPeriodEndDate = currentEndDate.subtract(numOfDaysBtwnStartEnd, 'days')

    //query for the total debtors for the current period 
    var currentPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_current_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${startDate}' and '${endDate}'`;
    //query for the total debtors for the previous period
    var previousPeriodTotalDebtorsQuery = `select sum(transaction_logs.total_sales_amount) as total_previous_debtors 
                                from transaction_logs, sales
                                where sales.sales_type_fk = 1 and (sales.payment_status_fk = 1 or sales.payment_status_fk = 2) and transaction_logs.sales_id = sales.id and transaction_logs.created_at between '${previousPeriodStartDate}' and '${previousPeriodEndDate}'`;

    //get increase/decrease in debtors for the period between  startDate and endDate:
    getQueryDataPromise(totalCashSalesAmountQuery).then((totalCashSales) => {
        //check if records were returned from the DB
        if (totalCashSales.status) {
            operatingActivitiesJSON["Cash_Sales"] = totalCashSales.message[0].total_cash_sales_amount;

        }
        else {//if not, log the message "no records were found"
            console.log(totalCashSales.message);
            return;
        }
        //get the total debtors between the start date and end date 
        return getQueryDataPromise(currentPeriodTotalDebtorsQuery)

    }).then((totalDebtorsCurrentPeriod) => {
        //check if records were returned from the DB
        if (totalDebtors) {
            console.log(totalDebtorsCurrentPeriod);
        }
        else {//if not, log the message "no records were found"
            console.log(totalDebtorsCurrentPeriod.message);
            return;
        }

        return getQueryDataPromise(previousPeriodTotalDebtorsQuery);

    }).then((totalDebtorsPreviousPeriod) => {
        var cashSalesAfterChangeInDebtors;
        //subtract the previous period total debtors from the current period total debtors
        var changeInDebtors = totalDebtorsCurrentPeriod.message[0].total_current_debtors - totalDebtorsPreviousPeriod.message[0].total_previous_debtors;
        //if the amount is a positive number 
        if (changeInDebtors >= 0) {
            operatingActivitiesJSON["change_in_debtors"] = numeral(-changeInDebtors).format('(0,0.00)');
            //then subtract the absolute value of the amount from the total cash sales
            cashSalesAfterChangeInDebtors = operatingActivitiesJSON["Cash_Sales"] - changeInDebtors;

            //store the final amount as cash collection from sales 
            operatingActivitiesJSON["cash_collection_from_sales"] = cashSalesAfterChangeInDebtors;
        }
        //else if it is a negative number 
        else {
            operatingActivitiesJSON["change_in_debtors"] = numeral(changeInDebtors).format('(0,0.00)');
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
    //get total cash purchases for the period between startDate and endDate
        //get increase/decrease in creditors for the period between  startDate and endDate: 
        //use moment for this
        //get the number of days between start date and end date
        //get the total creditors between the start date and end date 
        //get the total creditors between the previous start date(this is derived using the number of days between the current start date and current end date) and previous end date
        //subtract the previous total creditors from the current total creditors
            //if the amount is a positive number 
                //then add the amount to the total cash purchases
            //else if it is a negative number 
                //subtract the absolute value of the amount to the total cash sales 
        //store final amount as cash payment to suppliers


    //calculateOtherIncomeAndExpenses
    //check the the calculation to do 
    //if it is income then 
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






//On Hiatus   
 //calculate investing activities
   //how to determine an inflow or outflow in investing activities
   // add get proceeeds form sale of assets(inflow) -- add to 
   //subtract purchase of assets (outflow)

//calculate financing activities
   //how to determine an inflow or outflow in financing activities
   // add get proceeeds form sale of assets(inflow) -- add to 
   //subtract purchase of assets (outflow)


        