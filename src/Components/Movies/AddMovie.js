import React, { Component, Fragment } from "./node_modules/react";

import { Link } from "./node_modules/react-router-dom";

import axios from "../../axios-instance";
import Logout from "../../components/Auth/Logout/Logout";
import Loading from "../../components/common/Loading/Loading";

export default class AddMovie extends Component {
  state = {
    directorData: [],
    loading: true,
    message: "",
    genreTypes: [
      { id: 1, value: "COMEDY" },
      { id: 2, value: "ACTION" },
      { id: 3, value: "DRAMA" },
    ],
    input: {
      name: "",
      genreType: "COMEDY",
      rating: "",
      releaseDate: "",
      directorId: "",
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
        if (res.data.length < 1) {
          this.props.history.push("/must-add-director");
        } else {
          this.setState((prevState) => ({
            ...prevState,
            directorData: res.data,
            loading: false,
            input: {
              ...prevState.input,
              directorId: res.data[0].directorId,
            },
          }));
        }
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

    const {
      name,
      genreType,
      rating,
      directorId,
      releaseDate,
    } = this.state.input;

    axios
      .post(
        `/admin/movie`,
        {
          name,
          genreType,
          rating,
          releaseDate,
          director: { directorId: directorId },
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

        alert("Successfully created movie 😊");

        this.props.history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const directors = this.state.loading ? (
      <Loading />
    ) : this.state.directorData ? (
      this.state.directorData.map((director) => (
        <option key={director.directorId} value={director.directorId}>
          {director.name}
        </option>
      ))
    ) : null;

    const genreTypes = this.state.genreTypes.map((genre) => (
      <option key={genre.id} value={genre.value}>
        {genre.value}
      </option>
    ));

    const form = (
      <>
        <form onSubmit={this.formSubmitHandler}>
          <div className="inner-container">
            <div className="form-input">
              <label htmlFor="name" className="form-label">
                <span className="form-label-text">Movie Name:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Movie Name 😅"
                  id="name"
                  type="text"
                  name="name"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="genreType" className="form-label">
                <span className="form-label-text">Movie Genre:</span>
                <select onChange={this.dropDownChangeHandler} name="genreType">
                  {genreTypes}
                </select>
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="rating" className="form-label">
                <span className="form-label-text">IMDB Rating:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text"
                  id="rating"
                  placeholder="Enter IMDB Rating 😀"
                  max={10}
                  min={1}
                  step={0.5}
                  type="number"
                  name="rating"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="releaseDate" className="form-label">
                <span className="form-label-text">Release Date:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text"
                  id="releaseDate"
                  type="date"
                  name="releaseDate"
                  required
                />
              </label>
            </div>

            <div className="form-input">
              <label htmlFor="director" className="form-label">
                <span className="form-label-text">Director:</span>
                <select onChange={this.dropDownChangeHandler} name="directorId">
                  {directors}
                </select>
              </label>
            </div>

            <h3>{this.state.message}</h3>
            <input className="button" type="submit" value="ADD MOVIE" />
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
        <Link to="/movies">To Movies</Link>
        <Link to="/">Home Page</Link>
        {content}
      </Fragment>
    );
  }
}
