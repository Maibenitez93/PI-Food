const { getAllRecipes } = require('./data-controller');



const getQueryRecipe = async (req, res) => {
    const { name } = req.query;
    const allRecipes = await getAllRecipes();
  try{
      if (name) {
        const recipesName = allRecipes.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        recipesName.length
          ? res.status(200).send(recipesName)
          : res.status(404).send("No recipes found");
      } else {
        return res.status(200).send(allRecipes);
      }

  } catch(err) {
     return res.status(400).json({ err: err });
  }

};

  module.exports = { getQueryRecipe };