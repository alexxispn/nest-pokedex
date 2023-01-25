import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  PORT: Joi.number().default(3000),
  LIMIT: Joi.number().default(10),
  OFFSET: Joi.number().default(0),
});
