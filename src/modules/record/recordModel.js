const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const Language = require('../language/languageModel'); 

const Record = sequelize.define('Record', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Category: {
    type: Sequelize.STRING,
  },
  PageCount: {
    type: Sequelize.INTEGER,
  },
  LanguageId: {
    type: Sequelize.INTEGER,
  },
});

Record.belongsTo(Language);

module.exports = Record;
