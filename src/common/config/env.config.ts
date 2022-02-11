import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as Joi from 'joi';

dotenvExpand.expand(dotenv.config());

interface EnvVars {
  SSL_KEY: string;
  SSL_CERT: string;

  DB_USERNAME: string;
  DB_PASSWORD: string;

  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;

  PORT: number;
}

const envSchema = Joi.object<EnvVars, true>({
  SSL_KEY: Joi.string().required(),
  SSL_CERT: Joi.string().required(),

  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  DB_NAME: Joi.string().default('vote_it'),
  DB_HOST: Joi.string().hostname().default('127.0.0.1'),
  DB_PORT: Joi.number().port().default(3306),

  PORT: Joi.number().port().default(3000),
});

const { value: env, error } = envSchema
  .preferences({ errors: { label: 'key' }, stripUnknown: true })
  .validate(process.env);

if (error !== undefined) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const {
  SSL_KEY,
  SSL_CERT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  PORT,
} = env as EnvVars;
