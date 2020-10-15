const _             = require('lodash');
const e             = require('../exception/error');
const Worker        = require('worker-middleware').Worker;
const cd            = require('../../code/statusCode.json')['error'];
const post         = require('./product');

const v             = require('../validate');

exports = module.exports = {};
exports.run = run;

// function validate(event , type){
// 	return function (context, next){
// 		if(type=="search")
// 		{
// 			var rule = [
// 				[["postId","id","name","email","body"], "safe", 502],
// 			];
// 			var check = v.validate(event, rule ,context ,"get");
// 			if(check)
// 				return next();
// 			else
// 				return next(502)
// 		}
// 		var check = v.validate(event, rule ,context ,"post");

// 		if(check)
// 			next();
// 		else
// 			next(502)
// 	}
// }


function getProduct(event) {
	return new Promise(function(success,fail){
		var w = new Worker();
		w.do(post.getProduct());;
		w.run(function (context, err) {
			let response = {};
			if (err) {
				if(err==502)
					response = {
						errorMessage : context.vresponse
					};
				else
					response = {
						errorMessage : {
							code : err,
							message : cd[err],
						}
					};
			}else{
				response = {
					data     : context.data,
				};
			}

			// console.log("done "+ new Date());
			success(response);
		});
	});
};

function getPromo(event) {
	return new Promise(function(success,fail){
		var w = new Worker();
		w.do(post.getPromo());;
		w.run(function (context, err) {
			let response = {};
			if (err) {
				if(err==502)
					response = {
						errorMessage : context.vresponse
					};
				else
					response = {
						errorMessage : {
							code : err,
							message : cd[err],
						}
					};
			}else{
				response = {
					data     : context.data,
				};
			}

			// console.log("done "+ new Date());
			success(response);
		});
	});
};





function run(type,event) {
	switch(type) {
		case "getProduct":
			return getProduct(event);
		case "getPromo":
			return getPromo(event);
		default:
			return new Promise(function(success,fail){
				return success({
					errorMessage : {
						code    : 503,
						message : cd[503],
					}
				});
			});
			break;
	}
}


