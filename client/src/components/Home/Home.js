import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getTypesOfDiet, filterRecipesByDiet, filterCreated, orderByName, orderByScore } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.js';
import Paginate from '../Paginate/Paginate.js';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import './Home.css'

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
  },[dispatch]);

 
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
    setCurrentPage(1); // reset the page to 1
    setOrden(e.target.value);
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value)); // dispatching the action
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div className="homeContainer">
      <div className="nav-home">
        <h2>RECIPE BOOK</h2>
        <SearchBar />
        <div className="create">
          <Link to="/home/create" style={{ color: "white" }}>
            Create Recipe
          </Link>
        </div>
      </div>
      {/* filtros */}
      <div className="filtros">
        <div className="filter_AZ">
          <label>ORDER BY A-Z</label>
          <select onChange={(e) => handleOrderByName(e)}>
            <option>Choose an option</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="filter_score">
          <label>ORDER BY SCORE</label>
          <select onChange={(e) => handleOrderByScore(e)}>
            <option>Choose an option</option>
            <option value="all">All</option>
            <option value="asc">Highest Score</option>
            <option value="desc">Lowest Score</option>
          </select>
        </div>
        <div className="filter_diet">
          <label>FILTER BY DIET</label>
          <select onChange={(e) => handleFilterRecipes(e)}>
            <option>Choose an option</option>
            <option value="All">All</option>
            {diets && diets.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter_created">
          <label>FILTER BY CREATED</label>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option>Choose an option</option>
            <option value="all">All</option>
            <option value="db">Data Base</option>
            <option value="api">Api</option>
          </select>
        </div>
        <button
          className="reset"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          RESET
        </button>
      </div>
      <div className="container-card">
        {!currentRecipes ? <Loading/> : currentRecipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              name={recipe.title}
              diets={
                recipe.createDb
                  ? recipe.TypeDiets?.slice(0, 3).join(" ")
                  : recipe.diets?.slice(0, 3).join(" ")
              }
              image={
                recipe.image ? (
                  recipe.image
                ) : (
                  <image src="../../../../cooking.png" alt="recipe" />
                )
              }
              score={recipe.healthScore}
            />
          );
        }) }
      </div>
      <div className='container_pag'>
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Home;