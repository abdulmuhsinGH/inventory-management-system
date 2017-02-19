var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/customer.controller.js')



router
	.route('/add')
	.post(CustomerController.addCustomer);

router
	.route('/view')
	.get(CustomerController.viewCustomer);

router
	.route('/view/:customerId')
	.get(CustomerController.viewOneCustomer);

router
	.route('/search')
	.get(CustomerController.searchCustomers);

router
	.route('/update/:customerId')
	.put(CustomerController.updateCustomer);

router
	.route('/delete/:customerId')
	.put(CustomerController.deleteCustomer);



module.exports = router;