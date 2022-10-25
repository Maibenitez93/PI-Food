const getApiData = require('./apiData');
const getDbData = require('./dbData');

const getAllRecipes = async() => {
    const apiInfo = await getApiData();
    const dbInfo = await getDbData();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

module.exports = getAllRecipes;