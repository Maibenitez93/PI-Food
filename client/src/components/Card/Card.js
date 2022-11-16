import React from 'react';

function Card({ name, diets, image, score }) {
  return (
    <div className='container'>
          <h3>{name}</h3>
      <div className='card'>
          <img src={image} alt={name} width='200px' height='250px' />
      </div>
      <div>
        <h5>Type of Diet: {diets}</h5>
        <h5>Score:</h5>
        <i>{score}</i>
      </div>
     
        
    </div>
  )
};

export default Card;
