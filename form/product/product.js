const _         = require('lodash');
const r         = require("request")
r.debug         = true;
var jsonRequest = r.defaults({ json: true });

exports = module.exports = {};
exports.getProduct          = getProduct;
exports.getPromo            = getPromo;



function getProduct(){
	return function (context, next){
		var item =	[
				{
					id    : "wf",
					name  : "Workflow",
					price : 199.99,
					num   : 0,
				},
				{
					id    : "docgen",
					name  : "Document Generation",
					price : 9.99,
					num   : 0,
				},
				{
					id    : "form",
					name  : "Form",
					price : 99.99,
					num   : 0,
				},
		];

		context.data = item ;
		next();

	}
}

function getPromo(){
	return function (context, next){
		var item =	[
				{
					id            : "RRD4D32",
					des           : "10% discount for orders above $1000 (pre-discount)",
					apply_to      : 'all',
					min           : 1000,
					discount      : 'percentage',
					discount_amt  : 0.1,
				},
				{
					id            : "44F4T11",
					des           : "15% discount for orders above $1500 (pre-discount)",
					apply_to      : 'all',
					min           : 1500,
					discount      : 'percentage',
					discount_amt  : 0.15,
				},
				{
					id            : "FF9543D1",
					des           : "Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased",
					apply_to      : 'docgen', // apply to the code - "docgen" item
					min_code      : 'docgen', // minimum amount from  code - "docgen"
					min           : 10, // min required docgen amount = 10
					discount      : 'fix',
					discount_amt  : 8.99,
				},
				{
					id            : "YYGWKJD",
					des           : "Reduces the form price to $89.99 a unit when at least 1 wf is purchased",
					apply_to      : 'form', // apply to the code - "form" item
					min_code      : 'wf', // minimum amount from  code - "wf"
					min           : 1, // min required wf amount = 1
					discount      : 'fix',
					discount_amt  : 89.99,
				},
		];

		context.data = item ;
		next();

	}
}
