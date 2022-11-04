import axios from 'axios';
import { GET_RECIPES, FILTER_BY_DIET, FILTER_CREATED, ORDER_BY_NAME } from '../actiones-types';

export function getRecipes() {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/recipes')
        .then(res => {
            dispatch({ type: GET_RECIPES, payload: res.data })
        });
    };
};

export function filterRecipesByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    };
};

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    };
};

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    };
}