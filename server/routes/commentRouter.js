const express = require("express");
const commentcontroller= require('../controllers/comments/comment');
const router = express.Router();

router.post('/', commentcontroller.post)
router.get('/', commentcontroller.get)

module.exports = router;