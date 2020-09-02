import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getMovies } from "../../store/movies/actions";
import MovieCard from "../../components/Home/MovieCard";

import "./Home.scss";

const Home = (props) => {
  useEffect(() => {
    const currentPage = props.movies.currentPage;
    props.getMovies(currentPage);
  }, []);

  const movieList = props.movies.movieList.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <div className="m-home">
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
