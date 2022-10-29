const { getAllRecipes } = require('./data-controller');
const { Recipe, TypeDiet } = require('../db');


const validateRecipe = async (req, res, next) => {
  
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
      return res.status(400).json({msg: 'Title and summary are required'})
    } else {
      const getAllInfo = await getAllRecipes();
      
      const existRecipe = getAllInfo.find(
        (e) => e.title.toLowerCase() === title.toLowerCase()
      );
    
      if (existRecipe) {
        return res.json({ msg: "Recipe already exist" });
      }
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
      return res.status(400).json({ msg: "Invalid data" });
    }

  };

  const createRecipe = async (req, res) => {
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
      validateRecipe()
  
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
      return res.status(201).json("Recipe created successfully");
      
    } catch (err) {
       return res.status(400).json({ err: err });
    }
  }

module.exports = {
  validateRecipe,
  createRecipe,
};