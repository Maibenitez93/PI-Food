import {
  GET_RECIPES,
  GET_TYPES_OF_DIET,
  GET_RECIPES_BY_NAME,
  FILTER_BY_DIET,
  FILTER_CREATED,
  ORDER_BY_NAME,
  POST_RECIPES,
} from "../actiones-types";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      }
    case POST_RECIPES:
      return {
        ...state,
      }
    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      const filteredRecipes =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              recipe.diets.includes(action.payload)
            );
      return {
        ...state,
        recipes: filteredRecipes,
      };

    case FILTER_CREATED:
      const allData = state.allRecipes;
      const createdFilter =
        action.payload === "db"
          ? allData.filter((recipe) => recipe.createdInDb)
          : allData.filter((recipe) => !recipe.createdInDb);
      return {
        ...state,
        recipes: action.payload === "all" ? allData : createdFilter,
      };

    case ORDER_BY_NAME:
      let order =
        action.payload === "A-Z"
          ? state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    default:
      return state;
  }
}

export default rootReducer;
