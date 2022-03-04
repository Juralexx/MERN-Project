import React from 'react';

const Loader = () => {
  return (
    <div id="loader">
      <div className="loader-inner">
        <span className="loader-animation"></span>
      </div>
      <div className="loader-blurry"></div>
    </div>
  )
}

export default Loader;