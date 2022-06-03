import React from 'react';

export const Loader = () => {
    return (
        <div id="loader">
            <div className="loader_inner">
                <span className="loader_animation"></span>
            </div>
            <div className="loader_blurry"></div>
        </div>
    )
}

export const SmallLoader = () => {
    return (
        <div id="small-loader">
            <span className="loader_animation"></span>
            <p>Chargement...</p>
        </div>
    )
}