var express = require('express');
var router = express.Router();
var SupplierController = require('../controllers/supplier.controller.js')



router
	.route('/add')
	.post(SupplierController.addSupplier);

router
	.route('/view')
	.get(SupplierController.viewSupplier);

router
	.route('/view/:supplierId')
	.get(SupplierController.viewOneSupplier);

router
	.route('/update/:supplierId')
	.put(SupplierController.updateSupplier);

router
	.route('/delete/:supplierId')
	.put(SupplierController.deleteSupplier);



module.exports = router;