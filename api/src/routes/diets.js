const express = require('express');
const router = express.Router();

/* GET diets listing. */
router.get('/', function(req, res, next) {
  res.send('Get all diets');
});


module.exports = router;

/*
GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos 
indicados por spoonacular acá
*/

