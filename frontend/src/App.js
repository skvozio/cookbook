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
import AddIngredient from "./components/AddIngredient";
import AddStep from "./components/AddStep";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import CheckAuth from "./components/CheckAuth";
import Recipe from "./components/Recipe";
import UserAccount from "./components/UserAccount";
import EditUserDetails from "./components/EditUserDetails";

const initialState = {
    user: null,
};

if (localStorage.getItem('token')) {
    initialState.user = {}
    initialState.user.token = localStorage.getItem('token');
    initialState.user.username = localStorage.getItem('username');
    initialState.user.id = localStorage.getItem('id');
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {user: action.payload};
        case 'logout':
            return {user: null};
    }
};

function logout(dispatch){
    dispatch({type: 'logout'});
    localStorage.clear();
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const isLoggedIn = state.user && state.user.token;

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
                    </li>

                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <NavLink to="/add-recipe" activeClassName="active" className="nav-link">Add
                                    Recipe</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="my-account" activeClassName='active' className='nav-link'>My account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="#" activeClassName='active' className='nav-link' onClick={() => logout(dispatch)}>Logout</NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to='/register' activeClassName='active'
                                         className='nav-link'>Registration</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/login' activeClassName='active' className='nav-link'>Login</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <Route exact path="/">
                {isLoggedIn ? <RecipeList user={state.user}/> : 'Please login to see your recipes'}
            </Route>
            <Route exact path="/recipe/:id">
                {isLoggedIn ? <RecipeDetails
                    user={state.user}
                /> : <h1>Please log in to view the recipe</h1>}

            </Route>

            <Route exact path="/add-recipe">
                {isLoggedIn? <AddRecipe user={state.user}/> : <h1>Please log in to add a new recipe</h1>}
            </Route>
            <Route exact path="/edit-recipe/:id">
                {isLoggedIn ? <EditRecipe user={state.user}/> : 'You are not logged in'}
            </Route>

            <Route exact path="/add-ingredient/:id" component={AddIngredient}/>
            <Route exact path="/add-step/:id" component={AddStep}/>
            <Route exact path="/register" component={UserRegistration}/>
            <Route exact path="/edit-user-details">
                {isLoggedIn ? <EditUserDetails user={state.user}/> : 'You are not logged in'}
            </Route>
            <Route exact path="/my-account" >
                {isLoggedIn ? <UserAccount user={state.user}/> : 'You are not logged in'}
            </Route>
            <Route exact path="/login">
                <UserLogin onLogin={(user) => dispatch({type: 'login', payload: user})}/>
            </Route>
        </Router>

    );
}

export default App;
