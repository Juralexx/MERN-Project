import React from 'react';

export const Loader = () => {
    return (
        <div id="loader">
            <div className="loader-inner">
                <span className="loader-animation"></span>
            </div>
            <div className="loader-blurry"></div>
        </div>
    )
}

export const SmallLoader = () => {
    return (
        <div id="small-loader">
            <span className="loader-animation"></span>
            <p>Chargement...</p>
        </div>
    )
}