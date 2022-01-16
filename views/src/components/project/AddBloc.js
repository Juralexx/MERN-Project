import React from "react";
import { NavLink } from "react-router-dom";


const AddBloc = () => {

    return (
        <div className="add-bloc">
            <div class="btn-container">
                <NavLink to="/project/add" className="btn btn-primary">Ajouter un projet</NavLink>
            </div>
        </div>
    )
}

export default AddBloc;