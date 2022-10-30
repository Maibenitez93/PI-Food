const express = require('express');
const router = express.Router();
const { getDiets } = require('../controllers/getDiets-controller');

router.get('/', getDiets);


module.exports = router;


