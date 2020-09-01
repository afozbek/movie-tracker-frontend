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

    const directorId = this.props.match.params.directorId;

    axios
      .delete(`/admin/director/${directorId}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        this.setState({ message: res.data });

        alert("Successfully deleted 😊");

        this.props.history.push("/directors");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <Logout {...this.props} />
        <Link to="/directors">To Directors</Link>
        <Link to="/">Home Page</Link>

        <h1>Successfully deleted</h1>
      </Fragment>
    );
  }
}
