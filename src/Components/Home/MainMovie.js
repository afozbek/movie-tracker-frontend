import React from "react";

import { connect } from "react-redux";

import "./MainMovie.scss";

const MainMovie = ({ movie }) => {
  if (!movie.movieList.length) {
    return null;
  }
  const mainMovie = movie.movieList[0];
  const baseImageUrl = `https://image.tmdb.org/t/p/original${mainMovie.backdrop_path}`;

  return (
    <div className="m-mainMovie">
      <img className="m-mainMovie__img" src={baseImageUrl} alt="Movie" />
      <div className="m-mainMovie__desc">
        <h1 className="m-mainMovie__title">{mainMovie.title}</h1>
        <p className="m-mainMovie__story">{mainMovie.overview}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movies,
});

export default connect(mapStateToProps)(MainMovie);
