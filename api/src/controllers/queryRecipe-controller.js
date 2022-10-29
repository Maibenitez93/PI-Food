const { getAllRecipes } = require('./data-controller');



const getQueryRecipe = async (req, res) => {
  const { name } = req.query;
  const allRecipes = await getAllRecipes();
  console.log(allRecipes);
  if (name) {
    const recipesName = allRecipes.filter((e) =>
      e.title.toLowerCase().includes(name.toLowerCase())
    );
    recipesName.length
      ? res.status(200).send(recipesName)
      : res.status(404).send("No recipes found");
  } else {
    return res.status(200).send(allRecipes);
  }
};

module.exports = { getQueryRecipe };