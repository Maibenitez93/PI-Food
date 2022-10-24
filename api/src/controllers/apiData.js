const api = process.env.API_KEY;
const axios = require('axios');

const apiData = async (req, res) => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api}&number=30&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            instructions: e.analyzedInstructions,
            image: e.image
        }
    });
    return apiInfo; 
};

module.exports = apiData;