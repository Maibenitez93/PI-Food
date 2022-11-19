import React from "react";
import { Route } from "react-router-dom";
import  Landing  from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/Detail/RecipeDetail";
import RecipeForm from "./components/RecipeCreate/RecipeForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/create' component={RecipeForm}/>
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
    </div>
  );
}

export default App;
