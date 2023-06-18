import React from "react";

import "./bannerStyled.scss";

const Banner = (props) => {
  const handleGenres = (array) => {
    return array.join(" • ");
  };

  const handleSynopsys = (str) => {
    const temp = str.replace(/(<([^>]+)>)/gi, "");
    return temp.substring(0, 200) + "...";
  };

  return (
    <>
      <div className="banner" style={props.style}>
        <div className="banner-info-container">
          <div className="banner-info">
            <h1 className="banner-title">{props.title}</h1>
            <p className="banner-genres">{handleGenres(props.genres)}</p>
            <p className="banner-synopsis">{handleSynopsys(props.synopsis)}</p>
          </div>
        </div>

        <div className="banner-gradient" />

        <img className="banner-image" src={props.imageUrl} alt="" />
      </div>
    </>
  );
};

export default Banner;
