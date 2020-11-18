import React, {useState} from "react";
import axios from "axios"
import ConfirmDelete from "./ConfirmDelete";

export default function Ingredient(props) {
    const {ingredient, onEdit, isEditable} = props;
    const deleteUrl = (id) => `http://127.0.0.1:8000/api/v1/ingredients/${id}/`;
    const [show, setShow] = useState(false);

    function onAgreeToDelete() {
        console.log('agree to delete')
        setShow(false);
        axios.delete(deleteUrl(ingredient.id)).then((response) => {
            if (response.status === 204) {
                console.log("Deleted succesfully");
                props.onDelete()
            }
        })
    }

    function onDisagree() {
        setShow(false);
    }

    function onDelete() {
        setShow(true);
    }

    return (
        <>
            <li className="list-group-item">
                <div>{ingredient.name} {ingredient.quantity}{ingredient.unit}
                    {isEditable ? <>
                        <i className="fas fa-pen icon" onClick={onEdit}></i>
                        <div style={{position: "relative"}} className="icon-div">
                            <i className="fas fa-trash-alt icon" onClick={onDelete}></i>
                            <ConfirmDelete onAgree={onAgreeToDelete} show={show} onDisagree={onDisagree}
                                           itemType={"ingredient"}
                            />
                        </div>
                    </> : null}
                </div>
            </li>
        </>
    )
}
