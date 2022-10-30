const axios = require('axios');
const { TypeDiet } = require('../db.js');
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`
    );
    const diets = await dietsApi.data.results
      .map((e) => e.diets)
      .flat(Infinity);
    const dietsUnique = [...new Set(diets)];
    dietsUnique?.forEach((e) => {
      TypeDiet.findOrCreate({
        where: {
          name: e,
        },
      });
    });
    const dietsDb = await TypeDiet.findAll();
    res.send(dietsDb);
  } catch (error) {
    return res.status(400).json({ err: err });
  }
};

module.exports = { getDiets };