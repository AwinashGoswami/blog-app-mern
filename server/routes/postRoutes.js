const express = require('express');
const { createPost } = require('../controllers/postControllers');
const router = express.Router();
router.post('/create_post', createPost);
module.exports = router;