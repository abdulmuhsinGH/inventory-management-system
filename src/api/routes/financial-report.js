var express = require('express');
var router = express.Router();
var FinancialReportController = require('../controllers/financial-report/financial-report.controller.js');



router
	.route('cashflowstatement/add')
	.post(FinancialReportController.saveCashFlowStatement);

router
	.route('cashflowstatement/view')
	.get(FinancialReportController.getAllCashFlowStatements);

router
	.route('cashflowstatement/view/:cashFlowStatementId')
	.get(FinancialReportController.getOneCashFlowStatement);

router
	.route('cashflowstatement/search')
	.get(FinancialReportController.searchCashFlowStatement);
	
//income statement 
router
	.route('incomestatement/add')
	.post(FinancialReportController.saveIncomeStatement);

router
	.route('incomestatement/view')
	.get(FinancialReportController.getAllIncomeStatements);

router
	.route('incomestatement/view/:incomeStatementId')
	.get(FinancialReportController.getOneIncomeStatement);

router
	.route('incomestatement/search')
	.get(FinancialReportController.searchIncomeStatement);
