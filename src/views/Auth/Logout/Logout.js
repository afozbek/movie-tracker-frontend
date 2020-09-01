import React, { Component } from "./node_modules/react";

export default class Logout extends Component {
  state = {};

  logoutHandler = (e) => {
    localStorage.removeItem("jwttoken");
    this.props.history.push("/login");
  };

  render() {
    return (
      <button className="button abs-button" onClick={this.logoutHandler}>
        LOG OUT
      </button>
    );
  }
}
