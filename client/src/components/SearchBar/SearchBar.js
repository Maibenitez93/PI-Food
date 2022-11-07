import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByName } from '../../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipeByName(name));
        setName('');
    }

    useEffect(() => {
        dispatch(getRecipeByName(name));
    }, [dispatch, name]);

  return (
    <div>
        <input 
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
        />
        <button 
        type='submit'
        onSubmit={(e) => handleSubmit(e)}
        >
        Search
        </button>
    </div>
  )
}
