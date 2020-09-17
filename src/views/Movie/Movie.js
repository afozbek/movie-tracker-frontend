import React, { useEffect } from "react";

import axios from "../../axios-movie-instance";

import "./Movie.scss";
import { __MOVIE_PUBLIC_API_KEY__ } from "./../../utils/index";

const Movie = ({ location }) => {
  useEffect(() => {
    axios
      .get(location.pathname, {
        params: { api_key: __MOVIE_PUBLIC_API_KEY__ },
      })
      .then((res) => console.log(res.data));
  }, [location.pathname]);

  return <div className="m-movie">Movie Page</div>;
};

export default Movie;
