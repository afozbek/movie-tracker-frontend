import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getMovies } from "../../store/movies/actions";
import MovieCard from "../../components/Home/MovieCard";

import "./Home.scss";
import MainMovie from "./../../components/Home/MainMovie";
import MovieFilter from "./../../components/Home/MovieFilter";

const Home = (props) => {
  const [filterType, setFilterType] = useState("popular");

  useEffect(() => {
    const currentPage = props.movies.currentPage;
    props.getMovies(filterType, currentPage);
  }, [filterType]);

  const filterBtnClickHandler = (e) => {
    setFilterType(e.target.dataset.filterType);
  };

  const movieList = props.movies.movieList.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <div className="m-home">
      {/* <MovieFilter filterBtnClickHandler={filterBtnClickHandler} /> */}

      {/* <MainMovie /> */}

      <div className="m-home__movieList">{movieList}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: (currentPage) => dispatch(getMovies(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
