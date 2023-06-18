import React from "react";
import { useNavigate } from "react-router-dom";

import "./genreCardStyled.scss";

const GenreCard = (props) => {
  const navigate = useNavigate();

  const handleLowerCase = (str) => {
    return str.toLowerCase();
  };
  return (
    <>
      <a
        href={`/movies?genre=${handleLowerCase(props.genre)}`}
        className="genre-card"
        onClick={(e) => {
          e.preventDefault();
          navigate({
            pathname: "/movies",
            search: `?genre=${handleLowerCase(props.genre)}`,
          });
        }}
      >
        <p className="genre-text">{props.genre}</p>
      </a>
    </>
  );
};

export default GenreCard;
