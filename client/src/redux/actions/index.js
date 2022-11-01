import axios from 'axios';
import { GET_RECIPES } from '../actiones-types';

export function getRecipes() {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/recipes')
        .then(res => {
            dispatch({ type: GET_RECIPES, payload: res.data })
        });
    };
};