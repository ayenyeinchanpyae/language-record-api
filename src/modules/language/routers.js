const express = require('express');
const router = express.Router();
const languagesController = require('./languageController');

router.post('/languages', languagesController.post);
router.get('/languages', languagesController.index);
router.get('/languages/:id', languagesController.getLanguageById);

module.exports = router;
