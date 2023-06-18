import React from "react";

import "./cardItemStyled.scss";

const CardItem = (props) => {
  const handleGenres = (array) => {
    return array.join(" • ");
  };
  return (
    <>
      <a href={props.url} className="card-item">
        <img
          className="card-item-image"
          src={props.imageUrl}
          alt={props.title}
        />

        <div className="card-item-info">
          <p className="card-item-title">{props.title}</p>
          <p className="card-item-genres">{handleGenres(props.genres)}</p>
        </div>
      </a>
    </>
  );
};

export default CardItem;
