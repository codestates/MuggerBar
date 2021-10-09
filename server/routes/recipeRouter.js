const express = require("express");
const recipecontroller= require('../controllers/recipes/recipe');
const router = express.Router();


router.post('/', recipecontroller.post);
router.get('/', recipecontroller.get);
router.delete('/:id', recipecontroller.delete);
router.post('/:id/like', recipecontroller.like);

module.exports = router;