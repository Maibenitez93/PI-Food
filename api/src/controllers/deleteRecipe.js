const { getAllRecipes } = require('./data-controller');

const deleteById = async (req, res) => {
    const { id } = req.body;
    const allRecipes = await getAllRecipes();
    try {
        if(!allRecipes.find(r => r.id === id)) {
            return res.status(404).json({msg: `Recipe with id ${id} not found`})
        }
        const recipeIndex = allRecipes.findIndex(r => r.id === id);
        allRecipes.splice(recipeIndex, 1);
        return res.status(200).json({msg: `Recipe with id ${id} deleted`});
    
    } catch (error) {
        return res.status(400).json({ err: err });
    }
}

module.exports = { deleteById };