const Language = require('./languageModel');
const languageService = require('./languageService');
// const languageValidator = require('./languageValidator'); // Import the validator
const sequelize = require('../../config/database'); // Import database connection

exports.post = async (req, res) => {
  try {
    console.log('start');

    // Validation (ensure it's done before database/table operations)
    // const { error } = languageValidator(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });

    // Database and table checks/creation
    await sequelize.authenticate(); // Attempt connection to verify database
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`);
    await Language.sync({ force: false }); // Create table only if it doesn't exist

    console.log('after db and table checks'); // Log after both checks

    const languageItem = {
      Name: req.body.Name,
      createAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await languageService.createLanguage(languageItem);

    // Send response
    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating language' });
  }
};

exports.index = async (req, res) => {
  try {
    const languages = await languageService.getAllLanguages();
    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: languages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching languages' });
  }
};

exports.getLanguageById = async (req, res) => {
  try {
    console.log('id',req.params.id)
    const languageId = req.params.id;
    const language = await languageService.getById(languageId);

    if (!language) {
      return res.status(404).json({ message: `Language with ID ${languageId} not found` });
    }

    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: language,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching language' }); // Handle error
  }
};
