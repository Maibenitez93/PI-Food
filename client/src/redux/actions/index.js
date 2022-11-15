import axios from 'axios';
import {
  GET_RECIPES,
  GET_TYPES_OF_DIET,
  GET_RECIPES_BY_NAME,
  POST_RECIPES,
  //DELETE_RECIPE,
  FILTER_BY_DIET,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_DETAIL
} from "../actiones-types";

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

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            return await axios.get(`http://localhost:3001/recipes?name=${name}`)
            .then(res => {
                dispatch({ type: GET_RECIPES_BY_NAME, payload: res.data })
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function postRecipe(payload) {
    return async function (dispatch) {
        try {
            return await axios.post('http://localhost:3001/recipes', payload)
            .then(res => {
                dispatch({ type: POST_RECIPES, payload: res.data })
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

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload
    };
}

export function getDetail(id ) {
    return async function (dispatch) {
        try {
            return await axios.get(`http://localhost:3001/recipes/${id}`)
            .then(res => {
                dispatch({ type: GET_DETAIL, payload: res.data })
            });
        } catch (error) {
            console.log(error);
        }
    };
}