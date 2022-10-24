const express = require('express');
const router = express.Router();
const recipesRoutes = require('./recipes');
const dietsRoute = require('./diets');

router.use('/recipes', recipesRoutes);
router.use('/diets', dietsRoute);

module.exports = router;
