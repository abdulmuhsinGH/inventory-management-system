var express = require('express');
var router = express.Router();
var InventoryController = require('../controllers/inventory.controller.js')



router
	.route('/add')
	.post(InventoryController.addInventory);

router
	.route('/view')
	.get(InventoryController.viewInventories);

router
	.route('/view/:inventoryId')
	.get(InventoryController.viewInventoryDetails);

router
	.route('/update/:inventoryId')
	.put(InventoryController.updateInventory);

router
	.route('/delete/:inventoryId')
	.put(InventoryController.deleteInventory);

router
	.route('/setreorderlevel')
	.post(InventoryController.setReorderLevel);



module.exports = router;