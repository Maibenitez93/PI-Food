import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getTypesOfDiet } from '../../redux/actions';

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory();

    const [input, setInput] = useState({
        title: '',
        summary: '',
        dishTypes: [],
        healthScore: 0,
        instructions: '',
        diets: [],
        image: '',
    });

    useEffect(() => {
        dispatch(getTypesOfDiet());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheck = (e) => {
       if(e.target.checked){
        setInput({
            ...input,
            dishTypes: e.target.value
        })
      } 
    };

    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postRecipe(input));
        alert('Recipe created successfully');
        setInput({
            title: '',
            summary: '',
            dishTypes: [],
            healthScore: 0,
            instructions: '',
            diets: [],
            image: '',
        });
        history.push('/home');
    };


  return (
    <div>
        <Link to='/home'>
            <button>Home</button>
        </Link>
        <h1>Create Recipe</h1>
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                <label>Title</label>
                <input 
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label>Summary</label>
                <input 
                    type="text"
                    name="summary"
                    value={input.summary}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <span>Dish Types</span>
                <br/>
                <label>
                    <input 
                    type='chekbox'
                    name="side dish"
                    value='side dish'
                    onChange={(e)=>handleCheck(e)}
                    />side dish
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="lunch"
                        value='lunch'
                        onChange={(e)=>handleCheck(e)}
                    />lunch
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="main course"
                        value='main course'
                        onChange={(e)=>handleCheck(e)}
                    />main course
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="dinner"
                        value='dinner'
                        onChange={(e)=>handleCheck(e)}
                    />dinner
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="morning"
                        value='morning'
                        onChange={(e)=>handleCheck(e)}
                    />morning meal
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="brunch"
                        value='brunch'
                        onChange={(e)=>handleCheck(e)}
                    />brunch
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="breakfast"
                        value='breakfast'
                        onChange={(e)=>handleCheck(e)}
                    />breakfast
                </label>
                <br/>
                <label>
                    <input 
                        type='chekbox'
                        name="soup"
                        value='soup'
                        onChange={(e)=>handleCheck(e)}
                    />soup
                </label>
            </div>
            <div>
                <label>Health Score</label>
                <input 
                    type='number'
                    name="healthScore"
                    value={input.healthScore}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label>Instructions</label>
                <input 
                    type='text'
                    name="instructions"
                    value={input.instructions}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
              <span>Type of Diet</span>
              <br/>
              <select multiple onChange={e => handleSelect(e)}>
              {diets.map((diet) => (
                <option  key={diet.id} value={diet.name}>{diet.name}</option>
              ))}
              </select>
              <ul><li>{input.diets.map(e => e + " ,")}</li></ul>
            </div>
            <div>
                <label>Image</label>
                <input 
                    type='text'
                    name="image"
                    value={input.image}
                    onChange={e => handleChange(e)}
                />
            </div>
            <button type="submit">Create Recipe</button>
        </form>
    </div>
    );
}