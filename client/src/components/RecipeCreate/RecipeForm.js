import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getTypesOfDiet } from '../../redux/actions';

const initialForm = {
  title: "",
  summary: "",
  dishTypes: [],
  healthScore: 0,
  instructions: "",
  diets: [],
  image: "",
};

const validationsForm = (form) => {
    let errors = {};
    
    if (!form.title.trim()) {
        errors.title = "Title is required";  
    }
   
    return errors;
}


export default function RecipeForm() {
    const {
      form,
      errors,
      loading,
      response,
      handleChange,
      handleBlur,
      handleSubmit,
    } = useForm(initialForm, validationsForm);

    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory();

    useEffect(() => {
        dispatch(getTypesOfDiet());
    }, [dispatch]);

  return (
    <div>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onBlur={handleBlur}
            value={form.title}
            onChange={(e) => handleChange(e)}
           
          />
        </div>
        {errors.title && <p>{errors.title}</p>}
        <div>
          <label>Summary</label>
          <input
            type="text"
            name="summary"
            placeholder="Summary"
            onBlur={handleBlur}
            value={form.summary}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div class="multiselect">
          <div class="selectBox">
            <span>Dish Types</span>
            <div class="overSelect"></div>
          </div>
          <div id="checkboxes">
            <label for="one">
              <input
                type="checkbox"
                name="side dish"
                value="side dish"
                id="one"
              />
              side dish
            </label>
            <label for="two">
              <input type="checkbox" name="lunch" value="lunch" id="two" />
              lunch
            </label>
            <label for="three">
              <input
                type="checkbox"
                name="main course"
                value="main course"
                id="three"
              />
              main course
            </label>
            <label for="four">
              <input type="checkbox" name="dinner" value="dinner" id="four" />
              dinner
            </label>
            <label for="five">
              <input
                type="checkbox"
                name="morning meal"
                value="morning meal"
                id="five"
              />
              morning meal
            </label>
            <label for="six">
              <input type="checkbox" name="brunch" value="brunch" id="six" />
              brunch
            </label>
            <label for="seven">
              <input
                type="checkbox"
                name="breakfast"
                value="breakfast"
                id="seven"
              />
              breakfast
            </label>
            <label for="eight">
              <input type="checkbox" name="soup" value="soup" id="eight" />
              soup
            </label>
          </div>
        </div>
        <div>
          <label>Health Score</label>
          <input
            type="number"
            name="healthScore"
            value={form.healthScore}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Instructions</label>
          <input
            type="text"
            name="instructions"
            value={form.instructions}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <span>Type of Diet</span>
          <br />
          <select multiple >
            {diets.map((diet) => (
              <option key={diet.id} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            name="image"
            onBlur={handleBlur}
            value={form.image}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
