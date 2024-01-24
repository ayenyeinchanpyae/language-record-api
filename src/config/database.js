const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    define: {
      // Additional Sequelize configuration options
    },
  },
);

module.exports = sequelize;
