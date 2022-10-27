const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

/* GET recipes listing. */

const getApiData = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

  const apiInfo = await apiUrl.data.results.map(e => {
      return {
          id: e.id,
          name: e.title,
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

router.post("/", async (req, res) => {

  const {
    title,
    summary,
    healthScore,
    instructions,
    dishTypes,
    image,
    diets,
  } = req.body;
  console.log(req.body)

  if(!title || !summary) { 
    return res.json({msg: 'Title and summary are required'})
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
  res.json("Recipe created successfully");
});
// router.post('/', async (req, res) => {
//     res.send('Post new recipes');
// });
module.exports = router;

/*
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
[ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
[ ] Resumen del plato
[ ] Nivel de "comida saludable" (health score)
[ ] Paso a paso
Incluir los tipos de dieta asociados
*/
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

