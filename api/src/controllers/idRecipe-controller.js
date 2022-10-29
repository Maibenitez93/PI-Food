const { getAllRecipes } = require('./data-controller');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();

  if (id) {
    const recipeId = allRecipes.find((e) => e.id == id);

    recipeId
      ? res.status(200).send(recipeId)
      : res.status(404).send('Recipe not found');
  }
};

module.exports = { getRecipeById };