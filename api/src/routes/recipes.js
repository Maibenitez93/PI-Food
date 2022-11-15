const express = require('express');
const router = express.Router();
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const { validateRecipe, createRecipe } = require('../controllers/postRecipe-controller');
const { getRecipeByQuery } = require('../controllers/queryRecipe-controller');
const { getRecipeById } = require('../controllers/idRecipe-controller');
const  { deleteById } = require('../controllers/deleteRecipe');


router
    .get('/', getRecipeByQuery)
    .get("/:id",getRecipeById )
    .post("/create", validateRecipe, createRecipe)
    .delete("/", deleteById)

module.exports = router;