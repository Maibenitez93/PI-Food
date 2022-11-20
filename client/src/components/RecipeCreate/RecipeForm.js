import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTypesOfDiet } from '../../redux/actions';
import './RecipeForm.css'

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
  } else if (!regexString.test(form.title.trim())) {
    errors.title = "Title must be only letters";
  } else if (form.title.length > 80 || form.title.length < 3) {
    errors.title = "Title must be between 3 and 80 characters";
  }

  if (!form.summary.trim()) {
    errors.summary = "Summary is required";
  } else if (!regexString.test(form.summary.trim())) {
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
  } else if (form.instructions.length < 3 || form.instructions.length > 1000) {
    errors.instructions = "Instructions must be between 3 and 1000 characters";
  }

  if (form.image) {
    if (!form.image.includes("http")) {
      errors.image = "Image must be a valid URL";
    }
  }

  return errors;
};

export default function RecipeForm() {
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );

  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  return (
    <div className="container-form">
      <div className="form">
        <h3>CREATE RECIPE</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-title">
              <label>
                <b>TITLE</b>
              </label>
              <br />
              <input
                className="input"
                type="text"
                name="title"
                onBlur={(e) => handleBlur(e)}
                value={form.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.title && <p>{errors.title}</p>}

            <div className="input-summary">
              <label>
                <b>SUMMARY</b>
              </label>
              <br />
              <input
                className="input"
                type="text"
                name="summary"
                onBlur={(e) => handleBlur(e)}
                value={form.summary}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.summary && <p>{errors.summary}</p>}
            <div className="multiselect">
              <span>
                <b>DISH TYPES</b>
              </span>
              <div className="checkboxes">
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="side dish"
                    value="side dish"
                    id="one"
                  />
                  Side dish
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="lunch"
                    value="lunch"
                    id="two"
                  />
                  Lunch
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="main course"
                    value="main course"
                    id="three"
                  />
                  Main course
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="dinner"
                    value="dinner"
                    id="four"
                  />
                  Dinner
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="morning meal"
                    value="morning meal"
                    id="five"
                  />
                  Morning meal
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="brunch"
                    value="brunch"
                    id="six"
                  />
                  Brunch
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="breakfast"
                    value="breakfast"
                    id="seven"
                  />
                  Breakfast
                </label>
                <br />
                <label>
                  <input
                    className="input"
                    type="checkbox"
                    name="soup"
                    value="soup"
                    id="eight"
                  />
                  Soup
                </label>
              </div>
            </div>
            <div className="container-instrtuctions">
              <label>
                <b>INSTRUCTIONS</b>
              </label>
              <br />
              <input
                className="input"
                type="text"
                name="instructions"
                value={form.instructions}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.instructions && <p>{errors.instructions}</p>}
            <div className="container-diets">
              <span>
                <b>TYPE OF DIET</b>
              </span>
              <br />
              {diets.map((diet) => (
                <div>
                  <label>
                    <input
                      key={diet.id}
                      value={diet.name}
                      className="input"
                      type="checkbox"
                    ></input>
                    {diet.name}
                  </label>
                  <br />
                </div>
              ))}
            </div>
            <div className="container-score">
              <label>
                <b>HEALTH SCORE</b>
              </label>
              <input
                className="input"
                type="number"
                name="healthScore"
                value={form.healthScore}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {errors.healthScore && <p>{errors.healthScore}</p>}
            <div className="container-image">
              <label>
                <b>IMAGE</b>
              </label>
              <br />
              <input
                type="text"
                name="image"
                onBlur={(e) => handleBlur(e)}
                value={form.image}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.image && <p>{errors.image}</p>}
            <div className="container-submit">
              <button type="submit" className="btn-create">
                <b>CREATE</b>
              </button>
              <Link to="/home">
                <button className="btn-home">
                  <b>HOME</b>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
