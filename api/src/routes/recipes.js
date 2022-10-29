const express = require('express');
const router = express.Router();
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const { validateRecipe, createRecipe } = require('../controllers/postRecipe-controller');
//const { getAllRecipes } = require('../controllers/data-controller');
const { getQueryRecipe } = require('../controllers/queryRecipe-controller');


router.get('/', getQueryRecipe);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();

  if(id) {
    const recipeId = allRecipes.find((e) => e.id == id);
  
    recipeId
    ? res.status(200).send(recipeId)
    : res.status(404).send("Recipe not found");
  }
});

router.post("/", validateRecipe, createRecipe);




module.exports = router;