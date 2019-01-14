import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
}
export let DATABASE_CREDENTIALS;
export let BLIZZARD;
export let ENVIRONMENT;

try {
  ENVIRONMENT = process.env.NODE_ENV;
  const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

  BLIZZARD = {
    CLIENT_ID: process.env['BLIZZARD_CLIENT_ID'],
    CLIENT_SECRET: process.env['BLIZZARD_CLIENT_SECRET'],
    ACCESS_TOKEN: process.env['BLIZZARD_ACCESS_TOKEN']
  };

  DATABASE_CREDENTIALS = prod ? {
    host: process.env['MYSQL_URI'],
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_SCHEMA']
  } : {
    host: process.env['MYSQL_URI_LOCAL'],
    user: process.env['MYSQL_USER_LOCAL'],
    password: process.env['MYSQL_PASSWORD_LOCAL'],
    database: process.env['MYSQL_SCHEMA']
  };
} catch (error) {
  console.error('Could not load credentials', error);
}

if (!DATABASE_CREDENTIALS.host) {
  logger.error('No DB connection string. Set the environment variables.');
  process.exit(1);
}
