import React, { Component } from "react";

import axios from "../../axios-instance";
import Loading from "../../components/common/Loading/Loading";
import Logout from "../Auth/Logout/Logout";

export default class DeleteUserConfirm extends Component {
  state = { userData: {}, loading: true };

  confirmButtonHandler = (e) => {
    const userId = this.state.userData.userId;
    this.props.history.push(`/delete-user/${userId}`);
  };

  cancelButtonHandler = (e) => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const jwtToken = localStorage.getItem("jwttoken");
    if (!jwtToken) {
      this.props.history.push("/login");
    }

    const username = this.props.match.params.username;

    axios
      .get("/admin/user/" + username, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((res) => {
        this.setState({
          userData: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          err,
          loading: false,
        });
      });
  }

  render() {
    const content = this.state.loading ? (
      <Loading />
    ) : (
      <span>{this.state.userData.username}</span>
    );
    return (
      <React.Fragment>
        <Logout {...this.props} />
        <h1> Are you sure you want to delete user: {content}</h1>
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
