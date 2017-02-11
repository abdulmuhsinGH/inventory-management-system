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

	db.all("SELECT id, name, unit_of_measurment FROM products where deleted_at IS NULL", function(err, rows) {  
        
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

module.exports.viewOneProduct = function(req, res){
	var productId = req.params.productId;
	console.log(productId);
	db.get("SELECT name, unit_of_measurment FROM products WHERE id = "+productId+ " AND deleted_at IS NULL" , function(err, row) {  
        
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
	    stmt.run(req.body.name, req.body.unit_of_measurement, currentDateTime);

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
	var inventoryId = req.params.inventoryId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE inventories SET  selling_price = ?, deleted_at = ? where id='+inventoryId);
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
				  .json({state: 'success', user: null, message: "Selling Price Set"});

	  		}
	  	} )

	  
	});

	

}

module.exports.setCostPrice = function(req, res){
	var inventoryId = req.params.inventoryId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE inventories SET  cost_price = ?, updated_at = ? where product_id='+inventoryId);
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
				  .json({state: 'success', user: null, message: "Cost Price Set"});

	  		}
	  	} )

	  
	});



}

