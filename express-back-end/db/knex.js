require('dotenv').config({ path: '../.env' });

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];

module.exports = require('knex')(knexConfig);