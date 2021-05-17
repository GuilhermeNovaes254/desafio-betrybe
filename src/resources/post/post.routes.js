const express = require('express');
const { route } = require('../user/user.routes');
const router = express.Router();
const postController = require('./post.controller');

const auth = require('../../middlewares/auth');

router.post('/', [auth], postController.create);
router.get('/', [auth], postController.getAll);
router.get('/search', [auth], postController.search);
router.get('/:id', [auth], postController.getById);
router.put('/:id', [auth], postController.update);
router.delete('/:id', [auth], postController.delete);

module.exports = router;
