const apiData = require('./apiData');
const dbData = require('./dbData');

const allRecipes = async() => {
    const apiInfo = await apiData();
    const dbInfo = await dbData();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

module.exports = allRecipes;