const { Recipe, TypeDiet } = require('../db.js');

const getDbData = async () => {
    const dbInfo = await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['id','name'],
            through: {
                attributes: []
            },
        }
    });
    return dbInfo;
}

module.exports = getDbData;