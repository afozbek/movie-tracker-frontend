import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import axios from "../../axios-instance";
import Logout from "../Auth/Logout/Logout";
import Loading from "../../components/common/Loading/Loading";

export default class UpdateUser extends Component {
  state = {
    userData: {},
    loading: true,
    message: "",
    input: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm: false,
    },
  };

  confirmChangeHandler = (e) => {
    let checked = e.target.checked;
    let name = e.target.name;

    this.setState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [name]: checked,
      },
    }));
  };

  inputChangeHandler = (e) => {
    let inputName = e.target.name;
    let value = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [inputName]: value,
      },
    }));
  };

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const username = this.props.match.params.username;

    axios
      .get(`/admin/user/${username}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        let confirm = res.data.authorities.length >= 2 ? true : false;

        this.setState((prevState) => ({
          ...prevState,
          loading: false,
          input: {
            ...prevState.input,
            username: res.data.username,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            confirm,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  formSubmitHandler = (e) => {
    e.preventDefault();

    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const currentUsername = localStorage.getItem("username");

    const {
      username,
      password,
      firstName,
      lastName,
      confirm,
    } = this.state.input;

    axios
      .put(
        `/admin/user/${currentUsername}`,
        {
          username,
          password,
          firstName,
          lastName,
          authorities: confirm ? ["ROLE_ADMIN", "ROLE_USER"] : ["ROLE_USER"],
        },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      )
      .then((res) => {
        this.setState({ userData: res.data, loading: false });

        alert("Successfully updated user 😊");

        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);

        this.setState({ loading: false });
      });
  };

  render() {
    const username = this.state.loading ? (
      <Loading />
    ) : this.state.input ? (
      this.state.input.username
    ) : null;

    const form = (
      <>
        <form onSubmit={this.formSubmitHandler}>
          <div className="inner-container">
            <h1 className="header">Update User: {username}</h1>
            <div className="form-input">
              <label htmlFor="username" className="form-label">
                <span className="form-label-text">Username:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Your username"
                  id="username"
                  type="text"
                  name="username"
                  value={this.state.input.username}
                  required
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="firstName" className="form-label">
                <span className="form-label-text">Name:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Your Name"
                  id="firstName"
                  value={this.state.input.firstName}
                  type="text"
                  name="firstName"
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="lastName" className="form-label">
                <span className="form-label-text">Last Name:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Your Last Name"
                  value={this.state.input.lastName}
                  id="lastName"
                  type="text"
                  name="lastName"
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="password" className="form-label">
                <span className="form-label-text">Password:</span>
                <input
                  onChange={this.inputChangeHandler}
                  placeholder="Enter your Password"
                  className="form-text"
                  id="password"
                  type="password"
                  name="password"
                  required
                />
              </label>
            </div>
            <div className="form-input">
              <label htmlFor="confirm" className="form-label">
                <span className="form-label-text">User is Admin ?:</span>
                <input
                  onChange={this.confirmChangeHandler}
                  className="form-text"
                  checked={this.state.input.confirm}
                  id="confirm"
                  type="checkbox"
                  name="confirm"
                />
              </label>
            </div>
            <h3>{this.state.message}</h3>
            <input
              style={{ marginTop: 8, marginBottom: 6 }}
              className="button"
              type="submit"
              value="UPDATE"
            />
          </div>
        </form>

        <button className="button" onClick={() => this.props.history.goBack()}>
          GO BACK
        </button>
      </>
    );

    return (
      <Fragment>
        <Logout {...this.props} />

        <Link to="/users">See All Users</Link>
        <Link to="/">Home Page</Link>

        {form}
      </Fragment>
    );
  }
}
