var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')


module.exports.addSupplier =function(req, res){

	var supplier = req.body;
	console.log(supplier.name);
	db.serialize(function () {
	  var stmt = db.prepare('INSERT INTO suppliers(name, phone_number, email, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)');
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();


	    stmt.run(supplier.name, supplier.phone_number, supplier.email, supplier.description, currentDateTime, currentDateTime);

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
				  .json({state: 'success', user: null, message: "Supplier Added"});

	  		}
	  	} )

	  
	});

	
}

module.exports.viewSupplier = function(req, res){

	db.all("SELECT id, name, phone_number, email, description FROM suppliers where deleted_at IS NULL", function(err, rows) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!rows){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Supplier Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
       
    });   
	
}

module.exports.viewOneSupplier = function(req, res){
	var supplierId = req.params.supplierId;
	console.log(supplierId);
	db.get("SELECT id, name, phone_number, email, description FROM suppliers WHERE id = "+supplierId+ " AND deleted_at IS NULL" , function(err, row) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!row){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Supplier Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: row});
  		}
        
    });   

}

module.exports.searchSuppliers = function(req, res){
	var query ="";

  	query = "SELECT id, name, phone_number, email, description FROM suppliers where suppliers.name like '%"+req.query['search-term']+"%' and deleted_at IS NULL";

	

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

module.exports.updateSupplier = function(req, res){
	var supplierId = req.params.supplierId;
	var supplier = req.body;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE suppliers SET name = ?, phone_number = ?, email = ?, description = ?, updated_at = ? where id='+supplierId);
	  var date = new Date();  
  	  var currentDateTime = date.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(supplier.name, supplier.phone_number, supplier.email, supplier.description, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Supplier updated"});

	  		}
	  	} )

	  
	});

	

}

module.exports.deleteSupplier = function(req, res){
	var supplierId = req.params.supplierId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE suppliers SET  deleted_at = ? where id='+supplierId);
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
				  .json({state: 'success', user: null, message: "Supplier deleted"});

	  		}
	  	} )

	  
	});

	

}