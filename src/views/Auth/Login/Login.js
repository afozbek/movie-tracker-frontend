import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from "../../../components/common/Loading/Loading";

class Login extends Component {
  state = {
    userData: {},
    message: "",
    loading: true,
    input: {
      username: "",
      password: "",
    },
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
    this.setState({ loading: false });
  }

  formSubmitHandler = (e) => {
    e.preventDefault();

    const { username, password } = this.state.input;

    this.setState({
      loading: true,
    });

    axios
      .post("http://localhost:8080/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("jwttoken", res.data.token);
        localStorage.setItem("username", res.data.username);

        this.setState({
          userData: res.data,
          loading: false,
        });

        this.props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const content = this.state.loading ? (
      <Loading />
    ) : (
      <form onSubmit={this.formSubmitHandler}>
        <div className="inner-container">
          <h1 className="header">Login Form</h1>
          <div className="form-input">
            <label htmlFor="username" className="form-label">
              <span className="form-label-text">Username: </span>
              <input
                onChange={this.inputChangeHandler}
                className="form-text form-label-input"
                placeholder="Enter Your username"
                id="username"
                type="text"
                name="username"
                required
              />
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="password" className="form-label">
              <span className="form-label-text">Password: </span>
              <input
                onChange={this.inputChangeHandler}
                placeholder="Enter your password"
                className="form-text"
                id="password"
                type="password"
                name="password"
                required
              />
            </label>
          </div>
          <h3>{this.state.message}</h3>
          <input className="button" type="submit" value="LOGIN" />
        </div>
      </form>
    );

    return (
      <Fragment>
        <Link to="/register">To Register</Link>
        <Link to="/">Home Page</Link>
        {content}
      </Fragment>
    );
  }
}

export default Login;
