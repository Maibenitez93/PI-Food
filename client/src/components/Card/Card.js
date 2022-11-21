import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ name, diets, image, score, id }) {
  return (
    <div className="card">
      <div className="imgContainer">
        <img src={image} alt={name} width="200px" height="250px" />
      </div>
      <div className="cardInfo">
        <h3>{name}</h3>
      </div>
      <div className="itemCard">
        <p>{diets}</p>
      </div>
      <div className="item-score">
        <p>Health Score: {score}</p>
      </div>
      <div className="btn">
        <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
          <button className="btn">See more</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
