const lodash = require('lodash');
const string = require('../../string');

function count(ary, classifier) {
	return ary.reduce((counter,item)=>{
		let p = (classifier || String)(item);
		counter[p] = counter.hasOwnProperty(p) ? counter[p]+1 :1;
		return counter;
	},{});
}

function sumOfSquare(arr){
	let result = 0;
	arr.map((i)=>{
		result += i*i;
	});
	return result;
}

function cosine_similarity(sentence1, sentence2) {
	sentence1 = string.clean_punctuation(sentence1);
	sentence2 = string.clean_punctuation(sentence2);
	sentence1 = lodash.lowerCase(string.keep_single_space(sentence1));
	sentence2 = lodash.lowerCase(string.keep_single_space(sentence2));
	let sen1_buff = sentence1.split(' ');
	let sen2_buff = sentence2.split(' ');
	let main_buff = lodash.union(sen1_buff, sen2_buff);
	let dict_sen1 = count(sen1_buff);
	let dict_sen2 = count(sen2_buff);
	let vec_sen1 = [];
	let vec_sen2 = [];
	for(let sen_index in main_buff) {
		if(dict_sen1[main_buff[sen_index]]){
			vec_sen1.push(dict_sen1[main_buff[sen_index]]);
		}else{
			vec_sen1.push(0);
		}
		if(dict_sen2[main_buff[sen_index]]){
			vec_sen2.push(dict_sen2[main_buff[sen_index]]);
		}else{
			vec_sen2.push(0);
		}
	}
	let numerator = 0;
	for(let i in vec_sen1){
		numerator += vec_sen1[i]*vec_sen2[i];
	}
	let mod_d1 = Math.sqrt(sumOfSquare(vec_sen1));
	let mod_d2 = Math.sqrt(sumOfSquare(vec_sen2));
	return numerator/(mod_d1*mod_d2);
}
module.exports = cosine_similarity;