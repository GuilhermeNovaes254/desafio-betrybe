const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/me', userController.delete);
router.post('/', userController.create);

module.exports = router
