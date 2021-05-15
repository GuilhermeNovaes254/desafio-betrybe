const express = require('express');
const { route } = require('../user/user.routes');
const router = express.Router();
const postController = require('./post.controller');

const auth = require('../../middlewares/auth');

router.get('/', [auth], postController.getAll);
router.get('/:id', [auth], postController.getById);
router.post('/', [auth], postController.create);
router.put('/:id', [auth], postController.update);
router.get('/search', [auth], postController.search);
router.delete('/:id', [auth], postController.delete);

module.exports = router
