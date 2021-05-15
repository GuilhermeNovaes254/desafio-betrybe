const express = require('express');
const { route } = require('../user/user.routes');
const router = express.Router();
const postController = require('./post.controller');

router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.post('/', postController.create);
router.put('/:id', postController.update);
router.get('/search', postController.search);
router.delete('/:id', postController.delete);

module.exports = router
