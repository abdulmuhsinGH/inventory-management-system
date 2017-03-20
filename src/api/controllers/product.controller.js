//require('../model/db.js');
var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db'),
	bcrypt = require('bcrypt-nodejs');


module.exports.addProducts =function(req, res){
	
	db.serialize(function () {
	  var stmt = db.prepare('INSERT INTO products(name,unit_of_measurment,created_at,updated_at) VALUES (?,?,?,?)');
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(req.body.name,req.body.unit_of_measurment, currentDateTime,currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(201)
				  .json({state: 'success', user: null, message: "Product Added"});

	  		}
	  	} )

	  
	});

	
}



module.exports.viewProducts = function(req, res){

	db.all("SELECT id, name, unit_of_measurment, products.current_cost_price, products.current_selling_price FROM products where deleted_at IS NULL", function(err, rows) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!rows){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Products Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
       
    });   
	
}

module.exports.searchProducts = function(req, res){
	var query ="";

  	query = "SELECT id, name, unit_of_measurment FROM products where products.name like '%"+req.query['search-term']+"%' and deleted_at IS NULL";

	

	db.all(query, function(err, rows) {  
        console.log(rows);
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(rows.length===0){
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

module.exports.viewOneProduct = function(req, res){
	var productId = req.params.productId;
	console.log(productId);
	db.get("SELECT products.name, products.unit_of_measurment, products.current_cost_price, products.current_selling_price  FROM products WHERE id = "+productId+ " AND deleted_at IS NULL" , function(err, row) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!row){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Products Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: row});
  		}
        
    });   

}

module.exports.updateProduct = function(req, res){
	var productId = req.params.productId;
	db.serialize(function () {
	  	var stmt = db.prepare('UPDATE products SET name = ?, unit_of_measurment = ?, updated_at = ? where id='+productId);
	  	var date = new Date();  
  	  	var currentDateTime = date.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(req.body.name, req.body.unit_of_measurment, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Product updated"});

	  		}
	  	} )

	  
	});

	

}

module.exports.deleteProduct = function(req, res){
	var productId = req.params.productId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE products SET  deleted_at = ? where id='+productId);
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();
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
				  .json({state: 'success', user: null, message: "Product deleted"});

	  		}
	  	} )

	  
	});

	

}


module.exports.setSellingPrice = function(req, res){
	var productId = req.params.productId;

	var sellingPrice = req.body.current_selling_price;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE products SET  current_selling_price = ?, updated_at = ? where id='+productId);
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(sellingPrice, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Selling Price Set"});

	  		}
	  	} )

	  
	});

	

}

module.exports.setCostPrice = function(req, res){
	var productId = req.params.productId;

	var costPrice = req.body.current_cost_price;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE products SET  current_cost_price = ?, updated_at = ? where id='+productId);
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(costPrice,currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Cost Price Set"});

	  		}
	  	} )

	  
	});



}

