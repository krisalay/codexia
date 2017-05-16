function keep_single_space(string) {
	try {
		string = string.replace(/\s\s+/g, ' ');
	}catch(e){
		if(e.name === 'TypeError'){
			var error_stack = e.stack.split('\n');
			var err = error_stack[2];
			var regExp = /\(([^)]+)\)/;
			var matches = regExp.exec(err);
			var er = new TypeError('provided parameter must be of string type. [keep_single_space(param:string)]\n'+matches[1]);
			throw er;// `TypeError: . (${matches[1]})`;
		}
	}
}

module.exports = keep_single_space;