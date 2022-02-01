import React, { useState } from "react";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";

const Map = () => {
    const [selectByDepartments, setSelectByDepartments] = useState(false)

    return (
        <div className="map-container">

            {selectByDepartments ? (
                <>
                    <button className="btn btn-primary" onClick={() => setSelectByDepartments(false)}>Filtrer par région</button>
                    <MapDepartments />
                </>
            ) : (
                <>
                    <button className="btn btn-primary" onClick={() => setSelectByDepartments(true)}>Filtrer par département</button>
                    <MapRegions />
                </>
            )}
        </div>

    )
}

export default Map;