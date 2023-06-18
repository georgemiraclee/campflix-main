import React from "react";

import "./movieCardStyled.scss";

const MovieCard = (props) => {
  const handleGenres = (array) => {
    return array.join(" • ");
  };

  const handleSynopsys = (str) => {
    if (str) {
      const temp = str.replace(/(<([^>]+)>)/gi, "");
      return temp.substring(0, 50) + "...";
    }
  };
  return (
    <>
      <a
        href={props.url}
        className="movie-card"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={props.imageUrl}
          alt={props.title}
          className="movie-card-image"
        />

        <div className="movie-card-info">
          <div className="movie-card-info-container">
            <p className="movie-title">{props.title}</p>
            <p className="movie-genres">{handleGenres(props.genres)}</p>
            <p className="movie-synopsis">{handleSynopsys(props.synopsis)}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default MovieCard;
