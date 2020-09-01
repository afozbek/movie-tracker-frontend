import React, { Component } from "./node_modules/react";

import axios from "../../axios-instance";
import Loading from "../../components/common/Loading/Loading";
import Logout from "../../components/Auth/Logout/Logout";

export default class DeleteMovieConfirm extends Component {
  state = { directorData: {}, loading: true };

  confirmButtonHandler = (e) => {
    const directorId = this.props.match.params.directorId;
    this.props.history.push(`/delete-director/${directorId}`);
  };

  cancelButtonHandler = (e) => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const jwtToken = localStorage.getItem("jwttoken");
    if (!jwtToken) {
      this.props.history.push("/login");
    }

    const directorId = this.props.match.params.directorId;
    axios
      .get("/admin/director/" + directorId, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((res) => {
        this.setState({
          directorData: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state.directorData);
    const content = this.state.loading ? (
      <Loading />
    ) : (
      <span>
        {this.state.directorData ? this.state.directorData.name : null}
      </span>
    );
    return (
      <React.Fragment>
        <Logout {...this.props} />
        <h1>
          Are you sure you want to delete director:
          {content}
        </h1>
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
