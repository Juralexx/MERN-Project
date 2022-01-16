import React from "react";
import { NavLink } from "react-router-dom";


const AddBloc = () => {

    return (
        <div className="add-bloc">
            <div className="btn-container">
                <NavLink to="/project/add" className="btn btn-primary">Ajouter un projet</NavLink>
            </div>
        </div>
    )
}

export default AddBloc;