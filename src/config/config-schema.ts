import Joi from 'joi';

export const configSchema = Joi.object({
  OPENAI_API_KEY: Joi.string().required(),
  OPENAI_MODEL: Joi.string().required(),
  OPENAI_TEMPERATURE: Joi.number().required(),
});
