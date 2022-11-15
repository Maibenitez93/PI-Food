import React from "react";
import { Route } from "react-router-dom";
import  Landing  from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/Detail/RecipeDetail";
//import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import RecipeForm from "./components/RecipeCreate/RecipeForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
      <Route exact path='/recipe/create' component={RecipeForm}/>
    </div>
  );
}

export default App;
