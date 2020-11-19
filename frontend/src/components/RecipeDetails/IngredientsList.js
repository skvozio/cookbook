import React, {useState} from 'react';
import IngredientViewSwitch from "./IngredientViewSwitch";
import AddIngredient from "../AddIngredient";

export default function IngredientsList(props) {
    const {isEditable, recipe_id} = props;
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [addIngMode, setAddIngMode] = useState(false);
    const renderIngredient = (ingredient) => <IngredientViewSwitch isEditable={isEditable} ingredient={ingredient}/>
    function addIngredient() {
        setAddIngMode(true);
    }
    function saveIngredient(new_ingredient) {
        setAddIngMode(false);
        console.log("ings", ingredients);
        console.log("new ing", new_ingredient);
        setIngredients([...ingredients, new_ingredient]);
    }
    return (
        <>
            <h4>Ingredients: <i className="fas fa-plus icon" onClick={addIngredient}></i></h4>
            {addIngMode ? <AddIngredient id={recipe_id} onSave={saveIngredient} /> : null}
            <ul className="list-group list-group-flush">
            {ingredients.map(renderIngredient)}
            </ul>
        </>
    );
}