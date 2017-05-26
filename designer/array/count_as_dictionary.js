'use strict';

const joi = require('joi');

const arrSchema = joi.array().min(1).items(joi.number(), joi.string());

function get_count_as_dictionary(ary,classifier){
  const arrValidation = joi.validate(ary,arrSchema);
  if(arrValidation.error){
    throw arrValidation.error;
  }
  return ary.reduce((counter,item)=>{
		let p = (classifier || String)(item);
		counter[p] = counter.hasOwnProperty(p) ? counter[p]+1 :1;
		return counter;
	},{});
}

module.exports = get_count_as_dictionary;
