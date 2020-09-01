import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import axios from "../../axios-instance";
import Logout from "../Auth/Logout/Logout";

export default class DeleteMovie extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const movieId = this.props.match.params.movieId;

    axios
      .delete(`/admin/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        this.setState({ message: res.data });

        alert("Successfully deleted 😊");

        this.props.history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <Logout {...this.props} />
        <Link to="/movies">To Movies</Link>
        <Link to="/">Home Page</Link>

        <h1>Successfully deleted</h1>
      </Fragment>
    );
  }
}
