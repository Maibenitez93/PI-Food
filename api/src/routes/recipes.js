const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Recipe, TypeDiet } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

/* GET recipes listing. */

const getApiData = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`);
  console.log()
  const apiInfo = await apiUrl.data.results.map(e => {
      return {
          id: e.id,
          name: e.title,
          summary: e.summary,
          healthScore: e.healthScore,
          instructions: e.analyzedInstructions.map(e => e.steps).flat(Infinity),
          image: e.image
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
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    summary,
    healthScore,
    instructions,
    image,
    createdInDb,
    diets,
  } = req.body;
  console.log(req.body)

  const recipeCreated = await Recipe.create({
    title,
    summary,
    healthScore,
    instructions,
    image,
    createdInDb,
  });

  const dietsDb = await TypeDiet.findAll({
    where: {
      name: diets,
    },
  });

  recipeCreated.addTypeDiets(dietsDb);
  res.status(200).send("Recipe created");
});
// router.post('/', async (req, res) => {
//     res.send('Post new recipes');
// });
module.exports = router;

/*
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.
*/