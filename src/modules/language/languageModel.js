const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Language = sequelize.define('Language', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Language;
