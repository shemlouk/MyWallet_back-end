import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export const recordSchema = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  value: Joi.number().greater(0).required(),
  description: Joi.string().required(),
  date: Joi.date().iso().required(),
});
