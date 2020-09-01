import React, { Component } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios-instance";

class Movie extends Component {
  state = {
    userId: "",
    favList: {},
    watchList: {},
  };
  watchButtonClickHandler = (e) => {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    axios
      .post(
        `/${this.state.userId}/watchList/${this.props.movieData.movieId}`,
        null,
        {
          headers: { Authorization: "Bearer " + jwttoken },
        }
      )
      .then((res) => {
        this.setState({
          watchList: res.data,
        });

        this.props.history.push("/watchlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  favButtonClickHandler = (e) => {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    axios
      .post(
        `/${this.state.userId}/favList/${this.props.movieData.movieId}`,
        null,
        {
          headers: { Authorization: "Bearer " + jwttoken },
        }
      )
      .then((res) => {
        this.setState({
          favList: res.data,
        });

        this.props.history.push("/favlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const username = localStorage.getItem("username");

    axios
      .get("/admin/user/" + username, {
        headers: { Authorization: "Bearer " + jwttoken },
      })
      .then((res) => {
        this.setState({
          userId: res.data.userId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      movieId,
      name,
      genreType,
      releaseDate,
      rating,
      director,
    } = this.props.movieData;

    const releaseDateFormatted = new Date(releaseDate).toDateString();

    return (
      <tr>
        {this.props.isWatch ? null : (
          <td>
            <span
              style={{ cursor: "pointer" }}
              onClick={
                this.props.isFav
                  ? () =>
                      this.props.favRemoveButtonHandler(
                        this.props.movieData.movieId
                      )
                  : this.favButtonClickHandler
              }
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          </td>
        )}
        {this.props.isFav ? null : (
          <td>
            <span
              style={{ cursor: "pointer" }}
              onClick={
                this.props.isWatch
                  ? () =>
                      this.props.watchRemoveButtonHandler(
                        this.props.movieData.movieId
                      )
                  : this.watchButtonClickHandler
              }
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          </td>
        )}
        <td>{movieId}</td>
        <td>{name}</td>
        <td>{genreType}</td>
        <td>{rating}</td>
        <td>{releaseDateFormatted}</td>
        <td>{director.name}</td>
        <td>
          <Link to={`/update-movie/${movieId}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </td>
        <td>
          <Link to={`/delete-movie-confirm/${movieId}`}>
            <FontAwesomeIcon icon={faTrash} />
          </Link>
        </td>
      </tr>
    );
  }
}

export default Movie;
