import React from "react";
import { Route } from "react-router-dom";
import  Landing  from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipe' component={RecipeCreate}/>
    </div>
  );
}

export default App;
