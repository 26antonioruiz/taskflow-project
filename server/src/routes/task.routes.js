const express = require('express');
const router = express.Router();

const controller = require('../controllers/task.controller');

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.delete('/:id', controller.deleteTask);
router.patch('/:id/toggle', controller.toggle);

module.exports = router;