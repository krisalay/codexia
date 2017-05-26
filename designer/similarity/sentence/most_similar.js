const joi = require('joi');
const cosineSimilarity = require('./cosine_similarity');

const docSchema = joi.object().keys({
  path: joi.boolean(),
  data: joi.string().required()
});
const docsListSchema = joi.array().min(2).items(joi.object({
  path: joi.boolean(),
  data: joi.string().required()
}));

function validateArguments(doc,docsList){
  const docValidation = joi.validate(doc,docSchema);
  const docsListValidation = joi.validate(docsList, docsListSchema);
  if(docValidation.error){
    throw docValidation.error;
  }if(docsListValidation.error){
    throw docsListValidation.error;
  }
}

function mostSimilar(doc, docsList){
  validateArguments(doc,docsList);
  let docData;
  let resultingSimilarity = [];
  if(doc.path){
    console.log('hi')
  }else{
    docData = doc.data;
  }
  docsList.map((item)=>{
    if(item.path){

    }else{
      resultingSimilarity.push(cosineSimilarity(docData,item.data));
    }
  });
  return resultingSimilarity;
}

module.exports = mostSimilar;
