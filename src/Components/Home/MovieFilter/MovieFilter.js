import React from "react";

import { connect } from "react-redux";
import { changeMovieFilterType } from "../../../store/movies/actions";
import "./MovieFilter.scss";

const MovieFilter = (props) => {
  return (
    <div
      className="m-movieFilter"
      onClick={(e) => props.changeMovieFilterType(e.target.dataset.filterType)}
    >
      <button className="m-movieFilter__btn" data-filter-type="popular">
        Popular
      </button>
      <button className="m-movieFilter__btn" data-filter-type="top_rated">
        Top Rated
      </button>
      <button className="m-movieFilter__btn" data-filter-type="now_playing">
        Now Playing
      </button>
      <button className="m-movieFilter__btn" data-filter-type="upcoming">
        Upcoming
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  changeMovieFilterType,
};

export default connect(null, mapDispatchToProps)(MovieFilter);
