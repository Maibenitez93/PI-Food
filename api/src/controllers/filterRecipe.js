const allRecipes = require('./allData');

const foundName = async (name) => {
    const allRecipes = await allRecipes();
   
    let filteredName = await allRecipes.filter((e) => {
        e.name.toLowerCase().includes(name.toLowerCase());
    });

    if(filteredName.length > 0) return filteredName;        
    else throw new Error ('Recipe not found');
};

module.exports = foundName;