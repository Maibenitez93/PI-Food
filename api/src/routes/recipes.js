const express = require('express');
const router = express.Router();
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;
const { validateRecipe, createRecipe } = require('../controllers/postRecipe-controller');
//const { getAllRecipes } = require('../controllers/data-controller');
const { getQueryRecipe } = require('../controllers/queryRecipe-controller');


//middleware

/* GET recipes listing. */

// const getApiData = async () => {
//   const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

//   const apiInfo = await apiUrl.data.results.map(e => {
//       return {
//           id: e.id,
//           title: e.title,
//           dishTypes: e.dishTypes.map(e => e),
//           summary: e.summary,
//           healthScore: e.healthScore,
//           instructions: e.analyzedInstructions.map(e => e.steps.map(e => e.step)).flat(),
//           image: e.image,
//           diets: e.diets.map(e => e),
//       }
//   });
//   //console.log(apiInfo);
//   return apiInfo; 
// };

// const getDbData = async () => {
//   const dbInfo = await Recipe.findAll({
//       include: {
//           model: TypeDiet,
//           attributes: ['name'],
//           through: {
//               attributes: []
//           },
//       }
//   });

//   return dbInfo;
// }

// const getAllRecipes = async() => {
//   const apiInfo = await getApiData();
//   const dbInfo = await getDbData();
//   const allInfo = apiInfo.concat(dbInfo);
//   return allInfo;
// }

// router.get("/", async (req, res) => {
//   const { name } = req.query;
//   const allRecipes = await getAllRecipes();

//   if (name) {
//     const recipesName = allRecipes.filter((e) =>
//       e.name.toLowerCase().includes(name.toLowerCase())
//     );
//     recipesName.length
//       ? res.status(200).send(recipesName)
//       : res.status(404).send("No recipes found");
//   } else {
//     res.status(200).send(allRecipes);
//   }
// });
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