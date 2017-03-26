var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db'),
	bcrypt = require('bcrypt-nodejs');

var moment = require('moment');


module.exports.viewAllSales = function(req, res){
	res
				  .status(200)
				  .json({message:"Hello There Sales"});
}

module.exports.addSale =function(req, res){

	var sales = req.body;
	console.log(sales);
	var date = new Date(); 
	var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	var currentDateTime = formattedDate.toLocaleString();
  	console.log("record sales");
		//console.log('date', currentDateTime);

	db.serialize(function () {

		
	  	var stmt = db.prepare('INSERT INTO sales(sales_type_fk, payment_status_fk, created_at, updated_at) VALUES (?, ?, ?, ?)');
	  	
  	  	console.log(stmt);
	    stmt.run( sales.sales_type, sales.payment_type, currentDateTime, currentDateTime);

	  	stmt.finalize(function(err){
	  		console.log();
	  		if(err){
	  			res
				  .status(00)
				  .json("error");
	  		}
	  		else{
	  			db.get("SELECT last_insert_rowid() as id", function (err, row) {
				     console.log('Last inserted id is: ', row['id']);
/*
				     res
				  .status(200)
				  .json({transaction_type: 'sale', id:row['id']});*/

				 exports.logTransactions(sales,res, {transaction_type: 'sale', id:row['id']})
				});

	  		}
	  	} )

	  
	});

	
}

module.exports.logTransactions = function(req, res, row){
	var date = new Date(); 
	var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	var currentDateTime = formattedDate.toLocaleString();


     if( row.transaction_type==="sale"){

     		db.serialize(function () {
	  			var stmt = db.prepare('INSERT INTO transaction_logs(sales_id,customer_id, transaction_details, total_sales_amount, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?)');
		  		
		    	stmt.run( row.id, req.customerId, JSON.stringify(req.sales), req.total_sales_amount, currentDateTime, currentDateTime);

		  		stmt.finalize(function(err){
		  		
			  		if(err){
			  			res
						  .status(500)
						  .json({state:'fail', user:null, message:err});
			  		}
			  		else{
			  			res
						  .status(201)
						  .json({state: 'success', user: null, message: "Sales Recorded"});


			  		}
		  	} )

		  
		});

     }



     else {

     		db.serialize(function () {
	  			var stmt = db.prepare('INSERT INTO transaction_.logs(purchase_id, supplier_id, product_id, total_purchase_amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)');
		  		
		    	stmt.run( row.id, req.supplier_id, req.product_id, req.total_purchase_amount,currentDateTime, currentDateTime);

		  		stmt.finalize(function(err){
		  		console.log(err);
			  		if(err){
			  			res
						  .status(500)
						  .json(err);
			  		}
			  		else{
			  			res
						  .status(201)
						  .json({state: 'success', user: null, message: "Inventory Purchase Recorded"});


				  	}
			  	} )

			  
			});


     }

}