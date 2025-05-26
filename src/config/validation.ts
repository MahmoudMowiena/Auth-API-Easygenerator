import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().valid('development', 'staging', 'production').required(),

  PORT: Joi.number().default(3000),

  DATABASE: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(16).required(),

  JWT_EXPIRES_IN: Joi.string().required(),

  ALLOWED_ORIGINS: Joi.string().required().description('Comma-separated list of allowed CORS origins or "*"'),
});
