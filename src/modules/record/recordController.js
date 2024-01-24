const Record = require('./recordModel');
const recordService = require('./recordService');
const languageService = require('../language/languageService');
const recordValidator = require('./recordValidator');
const sequelize = require('../../config/database'); // Import database connection

exports.post = async (req, res) => {
  //* * VALIDATE  PHASE * *//
  const recordItem = req.body;
  try {
    try {
        await recordValidator.validateCreateRecord(recordItem);
    } catch (error) {
        res.status(400).json({
          success: false,
          message: 'VALIDATE_FAIL',
          error: error.message,
        });
        return; 
    }
    // Database and table checks/creation
    await sequelize.authenticate(); // Attempt connection to verify database
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`);
    await Record.sync({ force: false }); // Create table only if it doesn't exist

    //* * EXECUTE  PHASE * *//
    const record = await recordService.createRecord(recordItem);

    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: record,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'SERVER_ERROR',
      error: error.message,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const records = await recordService.getAll();
    const recordsWithLanguageNames = await Promise.all(
      records.map(async (record) => {
        const language = await languageService.getById(record.LanguageId);

        if (language !== null) {
          const { id, Name, createdAt, updatedAt } = record.dataValues; 
          const languageName = language.dataValues.Name;

          console.log(id, Name, createdAt, updatedAt);

          return { ...record.dataValues, languageName };
        } else {
          console.error('Language not found for the given LanguageId');
          return null; 
        }
      }),
    );
    console.log('record with name',recordsWithLanguageNames)
    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: recordsWithLanguageNames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching records' });
  }
};

exports.get = async (req, res) => {
  try {
    const recordId = req.params.id;
    if(!recordId){
        throw new Error()
    }
    const record = await recordService.getById(recordId);
    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: record,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching record' });
  }
};

exports.update = async (req, res) => {
    console.log('update')
  try {
    const recordId = req.params.id;
    const recordItem = req.body;
    //* * VALIDATE  PHASE * *//
    try {
      if (!recordId) {
        throw new Error('Record id is required');
      }
      const record = await recordService.getById(recordId);
      console.log('find by id',record)
      if (!record || record === null) {
        console.log('throw error')
        throw new Error(`Record with id ${recordId} does not exist`);
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'VALIDATE_FAIL',
        error: error.message,
      });
      return;
    }

    //* * EXECUTE PHASE * *//
    const result = await recordService.update(recordId, recordItem);

    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: result,
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({
       success: false,
       message: 'SERVER_ERROR',
       error: error.message,
     });
  }
};

exports.remove = async (req, res) => {
  try {
    const recordId = req.params.id;

    //* * VALIDATE  PHASE * *//
    try {
      if (!recordId) {
        throw new Error('Record id is required');
      }
      const record = await recordService.getById(recordId);
      console.log('find by id', record);
      if (!record || record === null) {
        console.log('throw error');
        throw new Error(`Record with id ${recordId} does not exist`);
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'VALIDATE_FAIL',
        error: error.message,
      });
      return;
    }

    //* * EXECUTE PHASE * *//
    const result = await recordService.remove(recordId);

    res.status(200).json({
      success: true,
      message: 'SUCCESS',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'SERVER_ERROR',
      error: error.message,
    });
  }
};
