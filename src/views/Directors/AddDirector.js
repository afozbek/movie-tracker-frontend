import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import axios from "../../axios-instance";
import Logout from "../Auth/Logout/Logout";
import Loading from "../../components/common/Loading/Loading";
import { birthPlaces } from "./BirthPlaces";

export default class AddMovie extends Component {
  state = {
    directorData: [],
    birthPlaces,
    loading: true,
    message: "",
    input: {
      name: "",
      surname: "",
      birthPlace: birthPlaces[0].place,
      birthDate: "",
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

  dropDownChangeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => ({
      ...prevState,
      directorId: "",
      input: {
        ...prevState.input,
        [name]: value,
      },
    }));
  };

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    axios
      .get(`/admin/director`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        this.setState({
          directorData: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          loading: false,
        });
      });
  }

  formSubmitHandler = (e) => {
    e.preventDefault();

    const jwttoken = localStorage.getItem("jwttoken");

    if (!jwttoken) {
      this.props.history.push("/login");
    }

    const { name, surname, birthPlace, birthDate } = this.state.input;

    axios
      .post(
        `/admin/director`,
        {
          name,
          surname,
          birthPlace,
          birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          movieData: res.data,
          loading: false,
        });

        alert("Successfully created 😊");

        this.props.history.push("/directors");
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const birthPlaces = this.state.birthPlaces.map((birthPlace) => (
      <option key={birthPlace.birthPlaceId} value={birthPlace.place}>
        {birthPlace.place}
      </option>
    ));

    const form = (
      <>
        <form onSubmit={this.formSubmitHandler}>
          <div className="inner-container">
            <div className="form-input">
              <label htmlFor="name" className="form-label">
                <span className="form-label-text">Name:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Director's Name"
                  id="name"
                  type="text"
                  name="name"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="surname" className="form-label">
                <span className="form-label-text">Surname:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Director's Surname"
                  id="surname"
                  type="text"
                  name="surname"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="director" className="form-label">
                <span className="form-label-text">BirthPlace:</span>
                <select onChange={this.dropDownChangeHandler} name="birthPlace">
                  {birthPlaces}
                </select>
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="birthDate" className="form-label">
                <span className="form-label-text">Birth Date:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text"
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  required
                />
              </label>
            </div>

            <h3>{this.state.message}</h3>
            <input className="button" type="submit" value="ADD DIRECTOR" />
          </div>
        </form>
        <button className="button" onClick={() => this.props.history.goBack()}>
          GO BACK
        </button>
      </>
    );

    const content = this.state.loading ? <Loading /> : form;

    return (
      <Fragment>
        <Logout {...this.props} />
        <Link to="/directors">To Directors</Link>
        <Link to="/">Home Page</Link>
        {content}
      </Fragment>
    );
  }
}
