import React, { useState, useEffect } from 'react';

const Loading = (className="", start=false, center=false, end=false) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  let justifyClass = "start";
  if (start) {
    justifyClass = "start";
  } else if (center) {
    justifyClass = "center";
  } else if (end) {
    justifyClass = "end";
  }

  return (
    <div className={`d-flex my-4 text-${justifyClass} justify-content-${justifyClass} ${show ? 'fade-in' : ''} ${className}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
