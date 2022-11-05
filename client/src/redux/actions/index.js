import axios from 'axios';
import { GET_RECIPES, GET_TYPES_OF_DIET, FILTER_BY_DIET, FILTER_CREATED, ORDER_BY_NAME } from '../actiones-types';

export function getRecipes() {
    return async function (dispatch) {
        try {
            return await axios.get('http://localhost:3001/recipes')
            .then(res => {
                dispatch({ type: GET_RECIPES, payload: res.data })
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export function getTypesOfDiet() {
    return async function (dispatch) {
        try {
            return await axios.get("http://localhost:3001/diets")
            .then(res => {
                dispatch({ type: GET_TYPES_OF_DIET, payload: res.data })
            });
        } catch (error) {
        console.log(error);
        }
    };
}

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