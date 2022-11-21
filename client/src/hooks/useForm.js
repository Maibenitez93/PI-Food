import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRecipe } from '../redux/actions';
import { useHistory } from 'react-router-dom';

export function useForm (initialForm, validateForm) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {
    const { checked, value } = e.target;
    if(checked) {
      setForm({
        ...form,
        dishTypes: [...form.dishTypes, value]
      });

    }
  }

  const handleCheck = (e) => {
    const { checked, value } = e.target;
    if(checked) {
      setForm({
        ...form,
        diets: [...form.diets, value]
      });

    }
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(form));

    setErrors(validateForm(form));
    
    if (Object.keys(errors).length === 0) {
      alert('Recipe created successfully');
      setForm(initialForm);
      history.push('/home');
    } else {
      alert('Recipe not created');
    }
  };
    
    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleCheckbox,
        handleCheck 
    }
}