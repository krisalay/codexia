const joi = require('joi');

const arg1Schema = joi.string();
const optionSchema = joi.object().keys({
	remove: joi.array().min(1)
});
const itemOptionSchema = joi.string();

function clean_punctuation(string,options) {
	const arg1Validation = joi.validate(string, arg1Schema);
	const optionValidation = joi.validate(options,optionSchema);
	if(arg1Validation.error !== null){
		throw arg1Validation.error;
	}
	if(optionValidation.error !== null){
		throw optionValidation.error;
	}
	if(typeof options !== 'undefined'){
		let reg_str = "[";
		for(let index in options.remove){
			const {error, value:itemOptionValidation} = joi.validate(options.remove[index],itemOptionSchema);
			if(error){
				throw error;
			}
			reg_str += options.remove[index];
		}
		reg_str += "]";
		let reg = new RegExp(reg_str,"g");
		string = string.replace(reg," ");
	}else{
		string = string.replace(/[.,!;:"'~`@#$%^&\*\(\){}\[\]>\?\/\\\|-]/g," ");
	}
	return string;
}

module.exports = clean_punctuation;
