var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('../../../../inventory_db.db');


var cashflowstatement = require('cash-flow-statement.js')
var incomestatement = require('income-statement.js')


module.exports.saveCashFlowStatement = (reg, res)=>{
	var result = cashflowstatement.generateCashFlowStatement(req.body);

	res
		.status(result.status)
		.json(result.message);
}

module.exports.getAllCashFlowStatements = (req,res)=>{
	var result =  cashflowstatement.getAllCashFlowStatements();

	res
		.status(result.status)
		.json(result.message);
}

module.exports.getOneCashFlowStatement = (req, res) =>{
	var result = cashflowstatement.getACashFlowStatement(req.params.cashFlowStatementId);

	res
		.status(result.status)
		.json(result.message);
}


module.exports.searchCashFlowStatement = (req, res) => {
	var result = cashflowstatement.filterCashFlowStatement(req.query['search-term']);

	res
		.status(result.status)
		.json(result.message);
}

module.exports.saveIncomeStatement = (req, res)=>{

	var result = cashflowstatement.generateIncomeStatement(req.body);
	
	res
		.status(result.status)
		.json(result.message);
}

module.exports.getAllIncomeStatements = (req,res)=>{
	var result =  incomestatement.getAllIncomeStatements();

	res
		.status(result.status)
		.json(result.message);
}

module.exports.getOneIncomeStatement = (req, res) =>{
	var result = incomestatement.getAIncomeStatement(req.params.incomeStatementId);

	res
		.status(result.status)
		.json(result.message);
}


module.exports.searchIncomeStatement = (req, res) => {
	var result = incomestatement.filterIncomeStatement(req.query['search-term']);

	res
		.status(result.status)
		.json(result.message);
}