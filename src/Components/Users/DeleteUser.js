import React, { Component, Fragment } from "./node_modules/react";

import { Link } from "./node_modules/react-router-dom";

import axios from "../../axios-instance";
import Logout from "../../components/Auth/Logout/Logout";

export default class DeleteUser extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const userId = this.props.match.params.userId;

    axios
      .delete(`/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        this.setState({
          message: res.data.message,
        });

        alert("Successfully deleted user 😊");

        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <Logout {...this.props} />
        <Link to="/users">To Users</Link>
        <Link to="/">Home Page</Link>

        <h1>{this.state.message}</h1>
      </Fragment>
    );
  }
}
