const express = require('express');
const { route } = require('../user/user.routes');
const router = express.Router();
const postController = require('./post.controller');

router.get('/', postController.getOne);
router.post('/', postController.create);
router.get('/:id', postController.getById);
router.put('/:id', postController.update);
router.get('/search', postController.search);
router.delete('/:id', postController.delete);

module.exports = router
