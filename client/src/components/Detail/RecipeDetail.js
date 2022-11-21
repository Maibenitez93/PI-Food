import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import './RecipeDetail.css'

export default function RecipeDetail(props) {

    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
  
    const { id } = useParams();
  
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

  return (
    <div className="container-detail">
      <div className="container-recipe">
        <h1>{detail.title}</h1>
        <div className="container-img">
          <img src={detail.image} alt={detail.title} />
        </div>
        <div className="container-summary">
          <h4>Health Score: {detail.healthScore}</h4>
          <h4>Dish Types: {detail.dishTypes}</h4>
          <h4>Diets: {detail.diets}</h4>
          {detail.summary && (<h4 dangerouslySetInnerHTML={{__html: `${detail.summary}` }} />)}
          
        </div>
        <div className="container-instructions">
          <p>
            Steps:{" "}
            {detail.instructions?.map((e) => (
              <ol>{e}</ol>
            ))}
          </p>
          <div className="container-btn">
            <Link to="/home">
              <button className="btn-recipe">
                <b>HOME</b>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
