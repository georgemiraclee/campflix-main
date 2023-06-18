import React, { useEffect, useState } from "react";
import GenreCard from "./genreCard";
import axios from "axios";

import "./style.scss";

const Genres = (props) => {
  const [genresData, setGenresData] = useState([]);
  const [genreCard, setGenreCard] = useState([]);

  const fetchGenres = async () => {
    try {
      await axios
        .get(props.apiUrl)
        .then((res) => {
          const temp = res.data.map((value) => value.show.genres);
          const mergeArr = [].concat.apply([], temp);
          setGenresData([...new Set(mergeArr)]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Campflix - Genres";
    fetchGenres();
  }, []);

  useEffect(() => {
    setGenreCard(genresData.map((value, index) => (
      <GenreCard key={index} genre={value} />
    )))
  }, [genresData])

  return (
    <>
      <div className="genres-page-container">
        <p className="genres-title">Genres</p>

        <div className="genres-card-container">
          {genreCard}
        </div>
      </div>
    </>
  );
};

export default Genres;
