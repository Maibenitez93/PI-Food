const { API_KEY } = process.env;
const axios = require('axios');

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

module.exports = getApiData;