import React from "react";
import "./Explore.css";
import { Link } from 'react-router-dom';

const Explore = ({ category, left }) => {
  return (
    <div key={category.id} className="category" role="group">
      {left === 1 && (
        <div className="imageClass">
          <img src={category.images[0]} alt={`category ${category.title}`} />
        </div>
      )}
      <div className="content">
        <div className="heading" role="heading" aria-level="2">
          {category.title}
        </div>
        <div className="description" role="note">
          {category.description}
        </div>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/products">
          <button className="exploreButton">
            {`Explore ${category.brand}`}
          </button>
        </Link>
      </div>
      {left === 0 && (
        <div className="imageClass">
          <img src={category.images[0]} alt={`category ${category.title}`} />
        </div>
      )}
    </div>
  );
};

export default Explore;
