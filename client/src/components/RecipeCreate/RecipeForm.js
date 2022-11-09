import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTypesOfDiet } from '../../redux/actions';

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

    let regexString = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      
    if (!form.title.trim()) {
        errors.title = "Title is required";  
    } else if(!regexString.test(form.title.trim())) {
        errors.title = "Title must be only letters";
    } else if (form.title.length > 80 || form.title.length < 3) {
        errors.title = "Title must be between 3 and 80 characters";
    }

    if (!form.summary.trim()) {
      errors.summary = "Summary is required";  
    } else if(!regexString.test(form.summary.trim())) {
      errors.title = "Summary must be only letters";
    } else if (form.summary.length > 255 || form.summary.length < 3) {
      errors.summary = "Summary must be between 3 and 255 characters";
    }

    if (!form.healthScore) {
      errors.healthScore = "HealthScore is required";  
    } else if (!Number.isInteger(form.healthScore)) {
      errors.healthScore = "HealthScore must be an integer";
    } else if (form.healthScore < 1 || form.healthScore > 100) {
      errors.healthScore = "HealthScore must be between 1 and 100";
    }

    if (!form.instructions.trim()) {
      errors.instructions = "Instructions is required";  
    } else if ( form.instructions.length < 3 || form.instructions.length > 1000) {
      errors.instructions = "Instructions must be between 3 and 1000 characters";
    }

    if (form.image) {
      if (!form.image.includes("http")) {
        errors.image = "Image must be a valid URL";
      } 
    }

    return errors;
}

export default function RecipeForm() {
    const {
      form,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
    } = useForm(initialForm, validationsForm);

    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    
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
            onBlur={(e) => handleBlur(e)}
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
            onBlur={(e) => handleBlur(e)}
            value={form.summary}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {errors.summary && <p>{errors.summary}</p>}
        <div className="multiselect">
          <div className="selectBox">
            <span>Dish Types</span>
            <div className="overSelect"></div>
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
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {errors.healthScore && <p>{errors.healthScore}</p>}
        <div>
          <label>Instructions</label>
          <input
            type="text"
            name="instructions"
            value={form.instructions}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {errors.instructions && <p>{errors.instructions}</p>}
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
            onBlur={(e) => handleBlur(e)}
            value={form.image}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.image && <p>{errors.image}</p>}
        <button type="submit">Create Recipe</button>
      </form>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
