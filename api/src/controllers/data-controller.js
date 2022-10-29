const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, TypeDiet } = require('../db.js');

const getApiData = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );

  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      dishTypes: e.dishTypes.map((e) => e),
      summary: e.summary,
      healthScore: e.healthScore,
      instructions: e.analyzedInstructions
        .map((e) => e.steps.map((e) => e.step))
        .flat(),
      image: e.image,
      diets: e.diets.map((e) => e),
    };
  });
  return apiInfo;
};

const getDbData = async () => {
  const dbInfo = await Recipe.findAll({
    include: {
      model: TypeDiet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return dbInfo;
};

const getAllRecipes = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = {
    getAllRecipes,
}