import React from 'react';
import './Card.css'

function Card({ name, diets, image, score }) {
  return (
    <div className='card'>
          <h3>{name}</h3>
      <div className='imgContainer'>
          <img src={image} alt={name} width='200px' height='250px' />
      </div>
      <div className='itemCard'>
        <h5 className='diets'>Type of Diet: {diets}</h5>
        <h5>Score:</h5>
        <i>{score}</i>
      </div>
     
        
    </div>
  )
};

export default Card;
