import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getMovies } from "../../store/movies/actions";
import MovieCard from "../../Components/Home/MovieCard/MovieCard";
import MovieFilter from "../../Components/Home/MovieFilter/MovieFilter";

import "./Home.scss";

const Home = (props) => {
  useEffect(() => {
    const currentPage = props.movies.currentPage;
    props.getMovies(props.movies.filterType, currentPage);
  }, [props.movies.filterType]);

  const movieList = props.movies.movieList.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <div className="m-home">
      <MovieFilter />

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
