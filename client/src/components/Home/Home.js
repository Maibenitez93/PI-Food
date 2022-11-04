import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipesByDiet, filterCreated, orderByName } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.js';
import Paginate from '../Paginate/Paginate.js';

function Home() {

  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  
  const [orden, setOrden] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

 
  //resetar el estado de la receta
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes()); // dispatching the action
  }
 
  //filtrar por dietas
  function handleFilterRecipes(e) {
    dispatch(filterRecipesByDiet(e.target.value)); // dispatching the action
  }

  //filtrar por creadas
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value)); // dispatching the action
  }

 function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value)); // dispatching the action
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div>
      <h1>RECETAS</h1>
      <Link to="/recipe">Create Recipe</Link>
      <br/>
      <br/>
      <button onClick={e => {handleClick(e)} }>
        Reset
      </button>
      <br/>
      <br/>
      {/* filtros */}
      <div>
        <select onChange={e => handleOrderByName(e)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select> {' '}
        <select onChange={e => handleFilterRecipes(e)}>
          <option value='All'>All</option>
          <option value='glueten free'>Glueten free</option>
          <option value='ketogenic'>Ketogenic</option>
          <option value='vegetarian'>Vegetarian</option>
          <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
          <option value='vegan'>Vegan</option>
          <option value='pescatarian'>Pescatarian</option>
          <option value='paleolithic'>Paleolithic</option>
          <option value='primal'>Primal</option>
          <option value='whole'>Whole</option>
          <option value='dairy free'>Dairy free</option>
        </select> {' '}
        <select onChange={e => handleFilterCreated(e)}>
          <option value='all'>All</option>
          <option value='db'>Data Base</option>
          <option value='api'>Api</option>
        </select>

        {currentRecipes?.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              name={recipe.title}
              diets={recipe.diets.slice(0, 3).join(', ')}
              image={recipe.image}
            />
          );
         })}

         <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Home;