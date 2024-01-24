const Joi = require('joi');

const schemaCreateRecord = Joi.object().keys({
  Name: Joi.string().trim().required(),
  Category: Joi.string().trim().required(),
  PageCount: Joi.number().integer().min(1).required(),
  LanguageId: Joi.number().integer().min(1).required(),
});

const schemaUpdateRecord = Joi.object().keys({
  id: Joi.number().integer().required(),
  Name: Joi.string().trim().required(),
  // Category: Joi.string().trim().required(),
  // PageCount: Joi.number().integer().min(1).required(),
  // LanguageId: Joi.number().integer().min(1).required(),
});

const validateCreateRecord = (item) => {
  return Joi.attempt(item, schemaCreateRecord, { abortEarly: false });
};

const validateUpdateRecord = (item) => {
  return Joi.attempt(item, schemaUpdateRecord, { abortEarly: false });
};

module.exports = {
  validateCreateRecord,
  validateUpdateRecord,
};
