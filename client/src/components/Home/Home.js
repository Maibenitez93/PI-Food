import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypesOfDiet, filterRecipesByDiet, filterCreated, orderByName } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.js';
import Paginate from '../Paginate/Paginate.js';
import SearchBar from '../SearchBar/SearchBar';

function Home() {

  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const diets = useSelector((state) => state.diets);
  
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

  useEffect(() => {
    dispatch(getTypesOfDiet());
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
    e.preventDefault();
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
      <SearchBar/>
      {/* filtros */}
      <div>
        <select onChange={e => handleOrderByName(e)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select> {' '}
        <select onChange={e => handleFilterRecipes(e)}>
          <option value='All'>All</option>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
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
              image={recipe.image ? recipe.image : <image src='../../../../cooking.png' alt='cooking' />}
            />
          );
         })}

         <Paginate recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginate={paginate}/>
         
      </div>
    </div>
  )
}

export default Home;