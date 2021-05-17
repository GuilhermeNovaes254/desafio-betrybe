const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const auth = require('../../middlewares/auth');

router.get('/', [auth], userController.getAll);
router.get('/:id', [auth], userController.getById);
router.delete('/me', [auth], userController.delete);
router.post('/', userController.create);

module.exports = router;
