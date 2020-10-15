var express     = require('express');
var router      = express.Router();
const _         = require('lodash');
const p         = require('../form/product');


router.get('/api/product/list', async function(req, response, next) {
	let a = await  p.run('getProduct',req);
	return response.json(a);
});

router.get('/api/product/getPromo', async function(req, response, next) {
	let a = await  p.run('getPromo',req);
	return response.json(a);
});




module.exports = router;