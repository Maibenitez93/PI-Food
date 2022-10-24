const express = require('express');
const router = express.Router();
const allRecipes = require('../controllers/allData');
const apiData = require('../controllers/apiData');
const dbData = require('../controllers/dbData');
const foundName = require('../controllers/filterRecipe');

/* GET recipes listing. */
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if(name) res.status(200).json(await foundName(name))
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// router.post('/', async (req, res) => {
//     res.send('Post new recipes');
// });
module.exports = router;

/*
GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado

GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.
*/