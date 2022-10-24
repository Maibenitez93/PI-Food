const Recipe = require('../models/Recipe');
const Diet  = require('../models/TypeDiet');

const dbData = async () => {
    const dbInfo = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['id','name'],
            through: {
                attributes: []
            },
        }
    });
    return dbInfo;
}

module.exports = dbData;