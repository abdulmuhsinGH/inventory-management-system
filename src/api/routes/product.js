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
	.route('/search')
	.get(ProductController.searchProducts);

router
	.route('/view/:productId')
	.get(ProductController.viewOneProduct);

router
	.route('/update/:productId')
	.put(ProductController.updateProduct);

router
	.route('/update/sellingprice/:productId')
	.put(ProductController.setSellingPrice);

router
	.route('/update/costprice/:productId')
	.put(ProductController.setCostPrice);

router
	.route('/delete/:productId')
	.put(ProductController.deleteProduct);



module.exports = router;