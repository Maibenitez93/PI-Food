import React from 'react';

function Card({ name, diets, image }) {
  return (
    <div className='container'>
      <div className='card'>
        <h3>{name}</h3>
        <img src={image} alt={name} width='200px' height='250px' />
        <h5>{diets}</h5>
      </div>
    </div>
  )
};

export default Card;
