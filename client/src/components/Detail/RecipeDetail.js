import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';

export default function RecipeDetail(props) {

    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    console.log(detail)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

  return (
    <div>
        <h1>{detail.title}</h1>
        <img src={detail.image} alt={detail.title} />
        <h4>Health Score: {detail.healthScore}</h4>
        <h4>Dish Types: {detail.dishTypes}</h4>
        <h4>Diets: {detail.diets}</h4>
        <h4>Summary: {detail.summary}</h4>
        <p>Steps: {detail.instructions.map(e => 
            <ol>{e}</ol>
        )}</p>
    </div>
  )
}
