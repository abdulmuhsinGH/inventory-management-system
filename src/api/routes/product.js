var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/product.controller.js')



router
	.route('/add')
	.post(ProductController.addProducts);

router
	.route('/view')
	.get(ProductController.viewProducts);

router
	.route('/view/:productId')
	.get(ProductController.viewOneProduct);

router
	.route('/update/:productId')
	.put(ProductController.updateProduct);

router
	.route('/delete/:productId')
	.put(ProductController.deleteProduct);



module.exports = router;