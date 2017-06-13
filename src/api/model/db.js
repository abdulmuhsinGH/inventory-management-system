var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('./inventory_db.db'),
	bcrypt = require('bcrypt-nodejs');

module.exports = db;