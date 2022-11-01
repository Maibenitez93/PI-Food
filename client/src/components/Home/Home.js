import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.js';

function Home() {

  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
 
  //resetar el estado de la receta
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes()); // dispatching the action
  }

  return (
    <div>
      <h1>RECETAS</h1>
      <Link to="/recipe">Crear Receta</Link>
      <br/>
      <br/>
      <button onClick={e => {handleClick(e)} }>
        Resetear
      </button>
      <br/>
      <br/>
      {/* filtros */}
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select> {' '}
        <select>
          <option value='all'>Todos</option>
          <option value='glueten'>Glueten free</option>
          <option value='ketogenic'>Ketogenic</option>
          <option value='vegetarian'>Vegetarian</option>
          <option value='lacto'>Lacto ovo vegetarian</option>
          <option value='vegan'>Vegan</option>
          <option value='pescatarian'>Pescatarian</option>
          <option value='paleolithic'>Paleolithic</option>
          <option value='primal'>Primal</option>
          <option value='whole'>Whole</option>
          <option value='dairy'>Dairy free</option>
        </select> {' '}
        <select>
          <option value='all'>Todos</option>
          <option value='db'>Base de datos</option>
          <option value='api'>Api</option>
        </select>
        {allRecipes?.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              name={recipe.title}
              diets={recipe.diets.slice(0, 3).join(', ')}
              image={recipe.image}
            />
          );
         })}
      </div>
    </div>
  )
}

export default Home;