

var AddProduct = function(product ){
	var result;
	db.serialize(function () {
  var stmt = db.prepare('INSERT INTO product(name,unit_of_measurement,created_at,updated_at) VALUES (?,?)')
  
    stmt.run(product.name,product.unit_of_measurement, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)

  	stmt.finalize(function(err){

  		if(err){
  			result = err;
  		}
  		else{
  			result = product;

  		}
  	} )

  /*db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })*/
})

db.close()

return result;
}