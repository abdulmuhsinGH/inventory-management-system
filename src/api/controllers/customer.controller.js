var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')

var moment = require('moment');

module.exports.addCustomer =function(req, res){

	var customer = req.body;
	console.log(customer.name);
	db.serialize(function () {
	  var stmt = db.prepare('INSERT INTO customers(name, phone_number, email, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)');
	  var date = new Date(); 
	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();


	    stmt.run(customer.name, customer.phone_number, customer.email, customer.description, currentDateTime, currentDateTime);

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
				  .json({state: 'success', user: null, message: "Customer Added"});

	  		}
	  	} )

	  
	});

	
}

module.exports.viewCustomer = function(req, res){

	db.all("SELECT id, name, phone_number, email, description FROM customers where deleted_at IS NULL", function(err, rows) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(rows.length<1){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Customer Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
       
    });   
	
}

module.exports.viewOneCustomer = function(req, res){
	var customerId = req.params.customerId;
	console.log(customerId);
	db.get("SELECT id, name, phone_number, email, description FROM customers WHERE id = "+customerId+ " AND deleted_at IS NULL" , function(err, row) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(row.length<1){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Customer Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: row});
  		}
        
    });   

}

module.exports.searchCustomers = function(req, res){
	var query ="";

  	query = "SELECT id, name, phone_number, email, description FROM customers where customers.name like '%"+req.query['search-term']+"%' and deleted_at IS NULL";

	

	db.all(query, function(err, rows) {  
        console.log(rows);
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(rows.length<1){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
       
    });   
	
}

module.exports.updateCustomer = function(req, res){
	var customerId = req.params.customerId;
	var customer = req.body;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE customers SET name = ?, phone_number = ?, email = ?, description = ?, updated_at = ? where id='+customerId);
	  var date = new Date(); 
	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(customer.name, customer.phone_number, customer.email, customer.description, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Customer updated"});

	  		}
	  	} )

	  
	});

	

}

module.exports.deleteCustomer = function(req, res){
	var customerId = req.params.customerId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE customers SET  deleted_at = ? where id='+customerId);
	  var date = new Date(); 
	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Customer deleted"});

	  		}
	  	} )

	  
	});

	

}