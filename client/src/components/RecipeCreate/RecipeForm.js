import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypesOfDiet, postRecipe } from '../../redux/actions';
import './RecipeForm.css'


const validationsForm = (input) => {
  let errors = {};

  let regexString = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!input.title.trim()) {
    errors.title = "Title is required";
  } else if (!regexString.test(input.title.trim())) {
    errors.title = "Title must be only letters";
  } else if (input.title.length > 80 || input.title.length < 3) {
    errors.title = "Title must be between 3 and 80 characters";
  }

  if (!input.summary.trim()) {
    errors.summary = "Summary is required";
  } else if (!regexString.test(input.summary.trim())) {
    errors.title = "Summary must be only letters";
  } else if (input.summary.length > 255 || input.summary.length < 3) {
    errors.summary = "Summary must be between 3 and 255 characters";
  }

  if (!input.healthScore) {
    errors.healthScore = "HealthScore is required";
  } else if (!Number.isInteger(Number(input.healthScore))) {
    errors.healthScore = "HealthScore must be an integer";
  } else if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "HealthScore must be between 1 and 100";
  }

  if (!input.instructions.trim()) {
    errors.instructions = "Instructions is required";
  } else if (input.instructions.length < 3 || input.instructions.length > 1000) {
    errors.instructions = "Instructions must be between 3 and 1000 characters";
  }

  if(input.diets.length === 0) {
    errors.diets = "Diets is required";
  }

  return errors;
};

export default function RecipeForm() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    instructions: "",
    diets: [],
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleCheck = (e) => {
    const { checked, value, name } = e.target;
    if(checked) {
      setInput({
        ...input,
        [name]: [...input.diets, value]
      });

    }
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));

    setErrors(validationsForm(input));
    
    if (Object.keys(errors).length === 0) {
      alert('Recipe created successfully');
      setInput({
        title: "",
        summary: "",
        healthScore: 0,
        instructions: "",
        diets: [],
        image: "",
      });
      history.push('/home');
    } else {
      alert('Recipe not created');
    }
  };

  return (
    <div className="container-form">
      <div className="form">
        <h3>CREATE RECIPE</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
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
                value={input.title}
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
                value={input.summary}
                onChange={(e) => handleChange(e)}              />
            </div>
            {errors.summary && <p>{errors.summary}</p>}
            <div className="container-instrtuctions">
              <label>
                <b>INSTRUCTIONS</b>
              </label>
              <br />
              <input
                className="input"
                type="text"
                name="instructions"
                value={input.instructions}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.instructions && <p>{errors.instructions}</p>}
            <div className="container-diets">
              <span>
                <b>TYPE OF DIET</b>
              </span>
              <br />
              {diets.map((diet) => (
                <div key={diet.id}>
                  <label>
                    <input
                      key={diet.id}
                      name={'diets'}
                      value={diet.name}
                      className="input"
                      type="checkbox"
                      onBlur={(e) => handleBlur(e)}
                      onChange={(e) => handleCheck(e)}
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
                value={Number(input.healthScore)}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleChange(e)}
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
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.image && <p>{errors.image}</p>}
            <div className="container-submit">
              <button type="submit" className="btn-create"  >
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
