import React, {useState} from 'react';
import StepViewSwitch from "./StepViewSwitch";
import AddStep from "../AddStep";
import AddIngredient from "../AddIngredient";

export default function StepList(props) {
    const {recipe_id, isEditable} = props;
    const [steps, setSteps] = useState(props.steps);
    const [addStepMode, setAddStepMode] = useState(false);
    const renderStep = (step) => <StepViewSwitch isEditable={isEditable} step={step}/>;

    function saveStep(new_step) {
        setAddStepMode(false);
        console.log("steps", steps);
        console.log("new step", new_step);
        setSteps([...steps, new_step]);
    }
        return (
            <>
                <h4>Steps:<i className="fas fa-plus icon" onClick={()=>{setAddStepMode(true)}}></i></h4>
                {addStepMode ? <AddStep id={recipe_id} onSave={saveStep}/> : null}
                <ul className="list-group list-group-flush">
                    {steps.map(renderStep)}
                </ul>
            </>
        )
    }