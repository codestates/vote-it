import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as Joi from 'joi';

dotenvExpand.expand(dotenv.config());

interface EnvVars {
  SSL_KEY: string;
  SSL_CERT: string;
}

const envSchema = Joi.object<EnvVars, true>({
  SSL_KEY: Joi.string().required(),
  SSL_CERT: Joi.string().required(),
});

const { value: env, error } = envSchema
  .preferences({ errors: { label: 'key' }, stripUnknown: true })
  .validate(process.env);

if (error !== undefined) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const { SSL_KEY, SSL_CERT } = env as EnvVars;
