import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchMovieCard from "./moviesCard";

import "./style.scss";

const Movies = (props) => {
  const [moviesData, setMoviesData] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchParams] = useSearchParams();

  const searchVal = searchParams.get("q") || null;
  const genreVal = searchParams.get("genre") || null;

  const firstLetterUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchDataByGenre = async (genre) => {
    try {
      await axios
        .get(props.apiUrl)
        .then((res) => {
          setMoviesData(
            res.data.filter((item) => {
              const genres = item.show.genres
                .join(" ")
                .toLowerCase()
                .split(" ");
              const value = genre;
              if (genreFilter(value, genres) !== -1) {
                return item;
              } else {
                return null;
              }
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const genreFilter = (str, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].match(str)) return i;
    }

    return -1;
  };

  const fetchDataBySearch = async (str) => {
    try {
      await axios
        .get(props.apiUrl)
        .then((res) => {
          setMoviesData(
            res.data.filter((item) => {
              const temp = item.show.name.toLowerCase().split(" ");
              const value = str.toLowerCase().split(" ");

              if (searchFilter(value, temp) !== -1) {
                return item;
              } else {
                return null;
              }
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const searchFilter = (str, arr) => {
    let correct = 0;
    if (str.length === 1) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].match(str)) return i;
      }
    } else if (str.length > 1) {
      for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].match(str[i])) correct++;
        }

        if (correct === str.length) return correct;
      }
    }

    return -1;
  };

  useEffect(() => {
    if (searchVal) {
      document.title = `Campflix - Search ${firstLetterUppercase(searchVal)}`;
      fetchDataBySearch(searchVal);
    }

    if (genreVal) {
      document.title = `Campflix - Genre ${firstLetterUppercase(genreVal)}`;
      fetchDataByGenre(genreVal);
    }
  }, [searchVal, genreVal]);

  useEffect(() => {
    setCardItems(
      moviesData.map((item, index) => (
        <SearchMovieCard
          key={index}
          title={item.show.name}
          genres={item.show.genres}
          synopsis={item.show.summary}
          imageUrl={
            item.show.image.original
              ? item.show.image.original
              : "https://via.placeholder.com/600x400?text=No+Image"
          }
          url={item.show.url}
        />
      ))
    );
  }, [moviesData]);

  return (
    <>
      <div className="movies-page-container">
        {searchVal && (
          <p className="movies-title">
            Showing all results for <i>{searchVal}</i>
          </p>
        )}

        {genreVal && (
          <p className="movies-title">{firstLetterUppercase(genreVal)}</p>
        )}

        <div className="movie-card-container">{cardItems}</div>
      </div>
    </>
  );
};

export default Movies;
