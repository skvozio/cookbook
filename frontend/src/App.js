import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
} from "react-router-dom";

import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import RecipeList from "./components/RecipeList";
import EditRecipe from "./components/EditRecipe";

function App() {

    return (
        <Router>
            <NavLink to="/" activeClassName="navLinkActive" className="navLink">Home</NavLink>
            <NavLink to="/add-recipe" activeClassName="navLinkActive" className="navLink">Add Recipe</NavLink>

            <Route exact path="/" component={RecipeList}/>
            <Route exact path="/recipe/:id" component={RecipeDetails}/>
            <Route exact path="/add-recipe" component={AddRecipe}/>
            <Route exact path="/edit-recipe/:id" component={EditRecipe}/>
        </Router>

    );
}

export default App;
