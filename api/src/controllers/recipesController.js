const { getAllRecipes, getRecipeByQuery, getRecipeById, createNewRecipe, deleteOneRecipe, updateOneRecipe} = require('../services/recipesService');

const getAllRecipes = async (req, res) => {
    const allRecipes = getAllRecipes();
}

const getRecipeByQuery = async (req, res) => {
    const recipeByQuery = getRecipeByQuery();
}

const getRecipeById = async (req, res) => {
    const recipeById = getRecipeById();
}

const createNewRecipe = async (req, res) => {
    const newRecipe = createNewRecipe();
}

const deleteOneRecipe = async (req, res) => {
    const deletedRecipe = deleteOneRecipe();
}

const updateOneRecipe = async (req, res) => {
    const updatedRecipe = updateOneRecipe();
}

module.exports = {
    getRecipeByQuery,
    getRecipeById,
    createNewRecipe,
    deleteOneRecipe,
    updateOneRecipe,
    getAllRecipes
}