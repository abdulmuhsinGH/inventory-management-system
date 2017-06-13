var express = require('express');
var router = express.Router();
var SaleController = require('../controllers/sale.controller.js')



router
	.route('/add')
	.post(SaleController.addSale);

router
	.route('/view')
	.get(SaleController.viewSale);

router
	.route('/view/:supplierId')
	.get(SaleController.viewOneSale);

router
	.route('/update/:supplierId')
	.put(SaleController.updateSale);

router
	.route('/delete/:supplierId')
	.put(SaleController.deleteSale);



module.exports = router;