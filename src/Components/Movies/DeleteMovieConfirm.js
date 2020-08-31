import React, { Component } from "react";

import axios from "../../axios-instance";
import Loading from "../../Util/Loading";
import Logout from "../Auth/Logout/Logout";

export default class DeleteMovieConfirm extends Component {
  state = { movieData: {}, loading: true };

  confirmButtonHandler = e => {
    const movieId = this.props.match.params.movieId;
    this.props.history.push(`/delete-movie/${movieId}`);
  };

  cancelButtonHandler = e => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const jwtToken = localStorage.getItem("jwttoken");
    if (!jwtToken) {
      this.props.history.push("/login");
    }

    const movieId = this.props.match.params.movieId;
    axios
      .get("/admin/movie/" + movieId, {
        headers: { Authorization: "Bearer " + jwtToken }
      })
      .then(res => {
        this.setState({
          movieData: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const content = this.state.loading ? (
      <Loading />
    ) : (
      <span>{this.state.movieData.name}</span>
    );
    return (
      <React.Fragment>
        <Logout {...this.props} />
        <h1>Are you sure you want to delete movie: {content}</h1>
        <button className="button" onClick={this.confirmButtonHandler}>
          HELL YEAH!
        </button>
        <button className="button" onClick={this.cancelButtonHandler}>
          NEVER MIND
        </button>
      </React.Fragment>
    );
  }
}
