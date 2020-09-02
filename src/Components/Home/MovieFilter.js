import React from "react";

const MovieFilter = (props) => {
  return (
    <div className="m-home__filterList" onClick={props.filterBtnClickHandler}>
      <button className="m-home__filterBtn" data-filter-type="popular">
        Popular
      </button>
      <button className="m-home__filterBtn" data-filter-type="top_rated">
        Top Rated
      </button>
      <button className="m-home__filterBtn" data-filter-type="now_playing">
        Now Playing
      </button>
      <button className="m-home__filterBtn" data-filter-type="upcoming">
        Upcoming
      </button>
    </div>
  );
};

export default MovieFilter;
