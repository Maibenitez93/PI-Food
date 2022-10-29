const { getAllRecipes } = require('./data-controller');



const getRecipeByQuery = async (req, res) => {
  const { name } = req.query;
  try {
    const allRecipes = await getAllRecipes();
    if (name) {
      const recipesName = allRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      recipesName.length
        ? res.status(200).send(recipesName)
        : res.status(404).send({msg: "recipe not found, try again"});
    } else {
      return res.status(200).send(allRecipes);
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

module.exports = { getRecipeByQuery };