const Joi = require("joi");

const schemas = {
  createNoteValidation: Joi.object({
    title: Joi.string().min(2).max(255),
    body: Joi.string().min(0).max(4000),
  }),
  openNoteValidation: Joi.object({
    noteId: Joi.string().required(),
  }),
  deleteNoteValidation: Joi.object({
    noteId: Joi.string().required(),
  }),
  editNoteValidation: Joi.object({
    title: Joi.string().min(2).max(255).required(),
    body: Joi.string().min(0).max(4000).required(),
    noteId: Joi.string().min(0).max(255).required(),
  }),
};

module.exports = schemas;
