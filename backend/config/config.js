require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'story_map_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
};
