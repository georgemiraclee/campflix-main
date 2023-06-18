import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../../App";
import { MdSearch, MdOutlineMenu } from "react-icons/md";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardItem from "./cardItem";

import "./style.scss";

const TopNav = (props) => {
  const [moviesData, setMoviesData] = useState([]);
  const [cardItem, setCardItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navContext = useContext(NavigationContext);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      scroll.scrollToTop();
      navigate({
        pathname: "/movies",
        search: `?q=${e.target.value}`,
      });
    } else {
      return;
    }
  };

  const fetchData = async (str) => {
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
    setCardItems(
      moviesData
        .slice(0, 3)
        .map((item, index) => (
          <CardItem
            key={index}
            title={item.show.name}
            genres={item.show.genres}
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
      <div className="top-nav-container">
        <div className="top-nav-content">
          <div className="top-nav-left-content">
            <a
              href="/"
              className="logo-container"
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollToTop();
                navigate("/");
              }}
            >
              <h1 className="logo-text">Campflix</h1>
            </a>

            <div className="items-container">
              <a
                href="/genres"
                className="item"
                onClick={(e) => {
                  e.preventDefault();
                  scroll.scrollToTop();
                  navigate("/genres");
                }}
              >
                Genres
              </a>
            </div>
          </div>

          <div className="top-nav-right-content">
            <div className="search-container">
              <input
                type="text"
                className="search"
                placeholder="Search"
                onKeyDown={handleSearch}
                onBlur={(e) => (e.target.value = "")}
                onChange={(e) => {
                  fetchData(e.target.value);
                  setSearchQuery(e.target.value);
                }}
              />

              <div className="search-icon">
                <MdSearch size={18} />
              </div>

              <div className="search-card">
                {cardItem}

                <button
                  className="more-results"
                  onClick={() => {
                    scroll.scrollToTop();
                    navigate({
                      pathname: "/movies",
                      search: `?q=${searchQuery}`,
                    });
                  }}
                >
                  MORE RESULTS
                </button>
              </div>
            </div>

            <p className="user-name">George Miracle </p>

            <button
              className="sidebar-toggler"
              onClick={() => navContext.setShowSidebar(true)}
            >
              <MdOutlineMenu size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
