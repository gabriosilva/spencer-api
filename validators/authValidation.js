const Joi = require("joi");

const schemas = {
  registerValidation: Joi.object({
    username: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
  }),
  loginValidation: Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
  }),
};

module.exports = schemas;
