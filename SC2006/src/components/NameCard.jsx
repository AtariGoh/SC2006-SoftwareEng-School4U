import React, { useState } from 'react';
import crossSvg from '../assets/cross.svg';

const NameCard = ({ schoolData, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(schoolData.name); // Pass the school name to the parent for removal
  };

  return (
      <div className=" bg-slate-300 flex flex-grow mx-3 rounded-lg flex justify-center px-1">
        <p>{schoolData.name}</p>
        <button onClick={handleRemoveClick}>
          <img className=" mx-1 w-5" src={crossSvg} alt="close" />
        </button>
      </div>
    )
};

export default NameCard;
