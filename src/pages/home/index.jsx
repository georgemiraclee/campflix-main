import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import Banner from "./banner";
import MovieCard from "./movieCard";

import "./style.scss";

const Home = (props) => {
  const [banners, setBanners] = useState([]);
  const [movieCards, setMovieCards] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [moviesLength, setMoviesLength] = useState(0);
  const [isBannerNavigate, setIsBannerNavigate] = useState(false);
  const [moviePos, setMoviePos] = useState(0);
  const [moviesData, setMoviesData] = useState([]);
  const [moviesBanner, setMoviesBanner] = useState([]);
  const [bannerTriger, setBannerTriger] = useState(false);

  const fetchData = async () => {
    try {
      await axios
        .get(props.apiUrl)
        .then((res) => {
          setMoviesData(
            res.data.map((movie, index) => {
              const title = movie.show.name;
              const genres = movie.show.genres;
              const synopsis = movie.show.summary;
              const imageUrl = movie.show.image
                ? movie.show.image.original
                : "https://via.placeholder.com/600x400?text=No+Image";
              const url = movie.show.url;

              return {
                key: index,
                title,
                genres,
                synopsis,
                imageUrl,
                url,
              };
            })
          );

          setMoviesBanner(
            res.data.slice(5, 8).map((movie, index) => {
              const title = movie.show.name;
              const genres = movie.show.genres;
              const synopsis = movie.show.summary;
              const imageUrl = movie.show.image
                ? movie.show.image.original
                : "https://via.placeholder.com/600x400?text=No+Image";
              const url = movie.show.url;

              return {
                title,
                genres,
                synopsis,
                imageUrl,
                url,
              };
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const createBannerSlider = async (movies) => {
    setBannerTriger(false);
    setBanners(
      await movies.map((movie, index) => {
        if (index === 0) {
          return (
            <Banner
              key={index}
              title={movie.title}
              genres={movie.genres}
              synopsis={movie.synopsis}
              imageUrl={movie.imageUrl}
              style={{
                marginLeft: `calc(-${100 * (banners.length - 2)}% - ${
                  20 * (banners.length - 2)
                }px)`,
              }}
            />
          );
        } else {
          return (
            <Banner
              key={index}
              title={movie.title}
              genres={movie.genres}
              synopsis={movie.synopsis}
              imageUrl={movie.imageUrl}
            />
          );
        }
      })
    );
  };

  const handleBannerSlider = () => {
    let index = slideIndex;

    for (let i = 0; i < moviesLength; i++) {
      if (slideIndex % moviesLength === i) {
        index = i;
      } else {
        continue;
      }
    }

    setMoviesBanner([...moviesBanner, moviesBanner[index]]);
  };

  const handleBannerNext = () => {
    setSlideIndex((prev) => prev + 1);
    setIsBannerNavigate(true);
  };

  useEffect(() => {
    document.title = "Campflix";
    fetchData().then(() => setBannerTriger(true));
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setMoviesLength(moviesBanner.length);
    setMovieCards(moviesData.map((movie) => (
      <MovieCard
        key={movie.key}
        title={movie.title}
        genres={movie.genres}
        synopsis={movie.synopsis}
        imageUrl={movie.imageUrl}
        url={movie.url}
      />
    )))
  }, [moviesData]);

  useEffect(() => {
    createBannerSlider(moviesBanner);
  }, [slideIndex, bannerTriger]);

  useEffect(() => {
    handleBannerSlider();
  }, [slideIndex]);

  useEffect(() => {
    if (isBannerNavigate) {
      setTimeout(() => {
        setIsBannerNavigate(false);
      }, 4000);
    } else {
      const interval = setInterval(() => {
        setSlideIndex((prev) => prev + 1);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleMovieRight = () => {
    const slider = document.querySelector(".movie-slider");
    const sliderLength = slider.children.length;
    const cardPerSlide = 6;
    const sliderSlideVal = sliderLength / cardPerSlide;

    if (moviePos < Math.floor(sliderSlideVal) - 1) {
      setMoviePos((prev) => prev + 1);
    } else if (moviePos > Math.floor(sliderSlideVal) - 1) {
      return;
    } else {
      setMoviePos(
        (prev) => prev + (sliderSlideVal - Math.floor(sliderSlideVal))
      );
    }
  };

  const handleMovieLeft = () => {
    if (moviePos > 0) {
      setMoviePos((prev) => {
        if (prev - 1 <= 0) {
          return 0;
        } else {
          return prev - 1;
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="banner-carousel-container">
          <div className="banner-carousel">{banners}</div>

          <button className="banner-prev">
            <FiChevronLeft size={60} />
          </button>

          <button className="banner-next" onClick={handleBannerNext}>
            <FiChevronRight size={60} />
          </button>
        </div>

        <div className="home-content">
          <p className="content-title">TV Shows</p>

          <div className="movie-container">
            <div className="movie-handle left-handle" onClick={handleMovieLeft}>
              <FiChevronLeft size={40} />
            </div>

            <div
              className="movie-slider"
              style={{ "--slider-index": moviePos }}
            >
              {movieCards}
            </div>

            <div
              className="movie-handle right-handle"
              onClick={handleMovieRight}
            >
              <FiChevronRight size={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
