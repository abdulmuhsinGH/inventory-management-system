var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db')

var moment = require('moment');




module.exports.viewInventories = function(req, res){

	db.all("select products.id, products.name, inventory_details.selling_price, inventory_details.cost_price, inventory_details.quantity, inventory_details.total_quantity,inventory_details.created_at from inventory_details left outer join products, suppliers on ( inventory_details.product_id = products.id and inventory_details.supplier_id = suppliers.id) where inventory_details.deleted_at is null and products.deleted_at is null order by  inventory_details.created_at desc", function(err, rows) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!rows){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Inventory Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: rows});
  		}
       
    });   
	
}

module.exports.searchInventories = function(req, res){
	var query ="";

  	query = "select products.id, products.name, inventory_details.selling_price, inventory_details.cost_price, inventory_details.quantity, inventory_details.total_quantity,inventory_details.created_at from inventory_details left outer join products, suppliers on ( inventory_details.product_id = products.id and inventory_details.supplier_id = suppliers.id) where products.name like '%"+req.query['search-term']+"%' and inventory_details.deleted_at is null and products.deleted_at is null order by  datetime(inventory_details.created_at) desc";

	

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

module.exports.viewInventoryDetails = function(req, res){
	var inventoryId = req.params.inventoryId;
	//console.log(customerId);
	db.get("select products.name, inventory_details.total_quantity from inventory_details left outer join products, suppliers on ( inventory_details.product_id = products.id and inventory_details.supplier_id = suppliers.id) where inventory_details.id = "+ inventoryId + " and inventory_details.deleted_at is null " , function(err, row) {  
        
		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(!row){
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: "No Inventory Found"});

  		}
  		else{
  			res
			  .status(200)
			  .json({state: 'success', user: null, result: row});
  		}
        
    });   

}

module.exports.addInventory = function (req, res) {
	var inventory = req.body;
	console.log(inventory);
	
	_addOneInventory(req, res, inventory);

}

module.exports.updateInventory = function (req, res) {
	
	var inventoryId = req.params.inventoryId;
	var inventory = req.body;
	var total_quantity =  inventory.quantity + inventory.prev_total_quantity;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE inventory_details SET product_id = ?, supplier_id = ?, cost_price = ?, selling_price = ?, quantity = ?, cost_price = ?, selling_price = ?, total_quantity = ?, updated_at = ? where id='+inventoryId);
	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(inventory.product_id, inventory.supplier_id, inventory.cost_price, inventory.selling_price, inventory.quantity, inventory.cost_price, inventory.selling_price, total_quantity, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Inventory updated"});

	  		}
	  	} )

	  
	});

}


module.exports.deleteInventory = function(req, res){
	var inventoryId = req.params.inventoryId;
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE inventory_details SET  deleted_at = ? where id='+inventoryId);
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
				  .json({state: 'success', user: null, message: "inventory deleted"});

	  		}
	  	} )

	  
	});

	

}


var _addOneInventory = function(req, res, inventory){
	var result; 
	
	db.get("SELECT total_quantity FROM inventory_details WHERE product_id = "+inventory.product_id+ " AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 1" , function(err, row) {  
        
		if(err){
			console.log("_addOneInventory");
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(row.length===0){
  				console.log("hello, no rows");
  			_insertInventory(req, res, inventory, {total_quantity:0});
  		}
  		else{
  				console.log("hello ,rows");
  			_insertInventory(req, res, inventory, row);
  		}
        
    });

}


var _insertInventory = function(req, res, inventory, product){
	
	db.serialize(function () {
	  var stmt = db.prepare('INSERT INTO inventory_details(product_id, supplier_id, quantity, cost_price, selling_price, total_quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
	  var date = new Date(); 
	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();


  	  

  	  productTotalQuantity = parseInt(inventory.quantity) + parseInt(product.total_quantity);
			

	    stmt.run(inventory.product_id, inventory.supplier_id,  inventory.quantity, inventory.cost_price, inventory.selling_price, productTotalQuantity, currentDateTime, currentDateTime);

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
				  .json({state: 'success', user: null, message: "Inventory Added"});

	  		}
	  	} )

	  
	});

}

var _createReorderLevel = function(req, res, reorderLevel){

	db.serialize(function () {
	  var stmt = db.prepare('INSERT INTO reorder_levels(product_id,  reorder_level, created_at, updated_at) VALUES (?, ?, ?, ?)');
	  var date = new Date();  
  	  var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();

	    stmt.run(reorderLevel.product_id, reorderLevel.reorder_level, currentDateTime, currentDateTime);

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
				  .json({state: 'success', user: null, message: "Reorder Level Set"});

	  		}
	  	} )

	  
	});
}

var _updateReorderLevel = function(req, res, reorderLevel, row){
	
	db.serialize(function () {
	  var stmt = db.prepare('UPDATE reorder_levels SET reorder_level = ?, updated_at = ? where product_id='+ row.product_id);
	  var date = new Date();  
  	  moment(date).format('YYYY-MM-DD HH:mm:ss'); 
  	  var currentDateTime = formattedDate.toLocaleString();
  	  	console.log(currentDateTime);
	    stmt.run(reorderLevel.reorder_level, currentDateTime);

	  	stmt.finalize(function(err){

	  		if(err){
	  			res
				  .status(500)
				  .json(err);
	  		}
	  		else{
	  			res
				  .status(200)
				  .json({state: 'success', user: null, message: "Reorder Level Updated"});

	  		}
	  	} )

	  
	});

}

module.exports.setReorderLevel = function(req, res){
		var reorderLevel = req.body;

		db.get("SELECT product_id FROM reorder_levels WHERE product_id = "+reorderLevel.product_id+ " AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 1" , function(err, row) {  
        
		if(err){
			
	  			res
				  .status(500)
				  .json(err);
	  		}
  		else if(row.length===0){
  				_createReorderLevel(req, res, reorderLevel);
  		}
  		else{
  				console.log(row)
  				_updateReorderLevel(req, res, reorderLevel, row);
  		}
        
    });

}