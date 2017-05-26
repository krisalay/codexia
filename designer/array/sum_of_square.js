const joi = require('joi');

const arrSchema = joi.array().min(1).items(joi.number());

function sumOfSquare(arr){
  const arrValidation = joi.validate(arr, arrSchema);
  if(arrValidation.error){
    throw arrValidation.error;
  }
	let result = 0;
	arr.map((i)=>{
		result += i*i;
	});
	return result;
}

module.exports = sumOfSquare;
