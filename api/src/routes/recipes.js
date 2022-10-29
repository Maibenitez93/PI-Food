const express = require('express');
const router = express.Router();
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;


//middleware
const validateRecipe = (req, res, next) => {
  
  const {
    title,
    summary,
    healthScore,
    instructions,
    dishTypes,
    image,
    diets,
  } = req.body;

  if(!title || !summary) { 
    return res.json({msg: 'Title and summary are required'})
  }

  if (
    typeof title !== "string" ||
    typeof summary !== "string" ||
    typeof healthScore !== "number" ||
    typeof instructions !== "string" ||
    typeof dishTypes !== "object" ||
    typeof image !== "string" ||
    typeof diets !== "object" 
  ) {
    return res.json({ msg: "Invalid data" });
  }
  next();
};
/* GET recipes listing. */

const getApiData = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

  const apiInfo = await apiUrl.data.results.map(e => {
      return {
          id: e.id,
          title: e.title,
          dishTypes: e.dishTypes.map(e => e),
          summary: e.summary,
          healthScore: e.healthScore,
          instructions: e.analyzedInstructions.map(e => e.steps.map(e => e.step)).flat(),
          image: e.image,
          diets: e.diets.map(e => e),
      }
  });
  return apiInfo; 
};

const getDbData = async () => {
  const dbInfo = await Recipe.findAll({
      include: {
          model: TypeDiet,
          attributes: ['name'],
          through: {
              attributes: []
          },
      }
  });

  return dbInfo;
}

const getAllRecipes = async() => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
}

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allRecipes = await getAllRecipes();

  if (name) {
    const recipesName = allRecipes.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    recipesName.length
      ? res.status(200).send(recipesName)
      : res.status(404).send("No recipes found");
  } else {
    res.status(200).send(allRecipes);
  }
});

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

router.post("/", validateRecipe, async (req, res) => {

  const {
    title,
    summary,
    healthScore,
    instructions,
    dishTypes,
    image,
    diets,
  } = req.body;

  try {
  const getAllInfo = await getAllRecipes();

  const existRecipe = getAllInfo.find(
    (e) => e.title.toLowerCase() === title.toLowerCase()
  );

  if (existRecipe) {
    return res.json({ msg: "Recipe already exist" });
  }

  const recipeCreated = await Recipe.create({
    title,
    summary,
    healthScore,
    instructions,
    dishTypes,
    image,
  });

  const dietsDb = await TypeDiet.findAll({
    where: {
      name: diets,
    },
  });

  await recipeCreated.addTypeDiets(dietsDb);
  return res.json("Recipe created successfully");

  } catch(err) {
    return res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();

  if(id) {
    const recipeId = allRecipes.find((e) => e.id == id);
  
    recipeId
    ? res.status.json(recipeId)
    : res.json("Recipe not found");
  }
});

module.exports = router;