const express = require('express');
const router = express.Router();
const recordController = require('./recordController');

router.post('/records', recordController.post);
router.get('/records', recordController.index);
router.get('/records/:id', recordController.get);
router.put('/records/:id', recordController.update);
router.delete('/records/:id', recordController.remove);

module.exports = router;
