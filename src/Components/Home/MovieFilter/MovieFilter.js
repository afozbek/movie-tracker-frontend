import React from "react";

import { connect } from "react-redux";
import { changeMovieFilterType } from "../../../store/movies/actions";
import "./MovieFilter.scss";

import { filterTypes } from "../../../utils";

const MovieFilter = (props) => {
  const filterButtons = filterTypes.map((btn) => {
    let classes = "m-movieFilter__btn";

    if (btn.filterType === props.movies.filterType) {
      classes += " -active";
    }

    return (
      <button
        className={classes}
        key={btn.id}
        data-filter-type={btn.filterType}
        onClick={(e) =>
          props.changeMovieFilterType(e.target.dataset.filterType)
        }
      >
        {btn.filterText}
      </button>
    );
  });

  return <div className="m-movieFilter">{filterButtons}</div>;
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

const mapDispatchToProps = {
  changeMovieFilterType,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieFilter);
