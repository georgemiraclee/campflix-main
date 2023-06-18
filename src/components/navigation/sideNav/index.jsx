import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../../App";
import { MdDoubleArrow, MdSearch } from "react-icons/md";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const safeDocument = typeof document !== "undefined" ? document : {};

const SideNav = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navContext = useContext(NavigationContext);
  const navigate = useNavigate();

  const containerStyle = {
    left: navContext.showSidebar ? "0" : "-300%",
  };

  const backdropStyle = {
    opacity: navContext.showSidebar ? "1" : "0",
    display: navContext.showSidebar ? "flex" : "none",
  };

  const contentStyle = {
    left: navContext.showSidebar ? "0" : "-300%",
  };

  const handleSidebar = () => {
    navContext.setShowSidebar(false);
  };

  useEffect(() => {
    const html = safeDocument.documentElement;
    if (navContext.showSidebar) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
    }
  }, [navContext.showSidebar]);

  return (
    <>
      <div className="side-nav-container" style={containerStyle}>
        <div
          className="side-nav-backdrop"
          style={backdropStyle}
          onClick={handleSidebar}
        ></div>

        <div className="side-nav-content" style={contentStyle}>
          <div className="side-nav-close-container">
            <button className="side-nav-close" onClick={handleSidebar}>
              <MdDoubleArrow size={24} />
            </button>
          </div>

          <div className="side-nav-title">
            <a
              href="/"
              className="title-container"
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollToTop();
                navigate("/");
              }}
            >
              <h1 className="logo-text">Campflix</h1>
            </a>
          </div>

          <div className="side-nav-line"></div>

          <div className="side-nav-user">
            <p className="user-name">George Miracle</p>

            <div className="search-container">
              <input
                type="text"
                className="search"
                placeholder="Search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 || e.key === "Enter") {
                    scroll.scrollToTop();
                    navigate({
                      pathname: "/movies",
                      search: `?q=${e.target.value}`,
                    });
                  }
                }}
              />

              <div
                className="search-icon"
                onClick={() => {
                  scroll.scrollToTop();
                  navigate({
                    pathname: "/movies",
                    search: `?q=${searchQuery}`,
                  });
                }}
              >
                <MdSearch size={18} />
              </div>
            </div>
          </div>

          <div className="side-nav-items">
            <a
              href="/genres"
              className="item"
              onClick={(e) => {
                e.preventDefault();
                scroll.scrollToTop();
                navigate("/genres");
              }}
            >
              <MdSearch size={24} />
              <p className="item-text">Genres</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
