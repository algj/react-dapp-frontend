import React from 'react';

const CardList = ({ children }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center g-3 card-list-anim">
      {children}
    </div>
  );
};

export default CardList;
