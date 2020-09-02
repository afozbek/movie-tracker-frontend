import React from "react";

import "./MovieCard.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { genres } from "../../utils";

const MovieCard = ({ movie }) => {
  console.log(movie);
  const baseImageUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <div className="m-movieCard">
      <div className="m-movieCard__header">
        <img className="m-movieCard__img" src={baseImageUrl} alt="" />
      </div>
      <div className="m-movieCard__body">
        <div className="m-movieCard__point">
          <FontAwesomeIcon className="m-movieCard__star" icon={faStar} />

          {movie.vote_average}
        </div>

        <h3 className="m-movieCard__title">{movie.title}</h3>

        <div className="m-movieCard__genreList">
          {movie.genre_ids.map((genreId) => (
            <div className="m-movieCard__genre">{genres[genreId]}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
