import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import axios from "../../axios-instance";
import Logout from "../Auth/Logout/Logout";
import Loading from "../../components/common/Loading/Loading";

export default class UpdateMovie extends Component {
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
      genreType: "",
      directorId: "",
      rating: "",
      releaseDate: "",
    },
  };

  dropDownChangeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [name]: value,
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

    const movieId = this.props.match.params.movieId;

    axios
      .get(`/admin/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      })
      .then((res) => {
        const movieData = res.data;
        console.log("TCL: UpdateMovie -> movieData", movieData);

        const releaseDate = new Date(movieData.releaseDate)
          .toISOString()
          .split("T")[0];

        axios
          .get(`/admin/director`, {
            headers: {
              Authorization: `Bearer ${jwttoken}`,
            },
          })
          .then((res) => {
            const directors = res.data;

            const filteredGenres = this.state.genreTypes.filter(
              (genre) => genre.value !== movieData.genreType
            );
            const movieDirector = directors.filter(
              (director) =>
                director.directorId === movieData.director.directorId
            );

            const filteredDirectors = directors.filter(
              (director) =>
                director.directorId !== movieData.director.directorId
            );

            const directorData = [...movieDirector, ...filteredDirectors];

            this.setState((prevState) => ({
              ...prevState,
              loading: false,
              directorData,
              genreTypes: [
                { id: 5, value: movieData.genreType },
                ...filteredGenres,
              ],
              input: {
                ...prevState.input,
                name: movieData.name,
                rating: movieData.rating,
                releaseDate,
                directorId: directorData[0].directorId,
                genreType: movieData.genreType,
              },
            }));
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              loading: false,
            });
          });
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

    const movieId = this.props.match.params.movieId;

    const {
      name,
      genreType,
      rating,
      releaseDate,
      directorId,
    } = this.state.input;

    axios
      .put(
        `/admin/movie/${movieId}`,
        {
          name,
          rating,
          releaseDate,
          genreType,
          director: { directorId },
        },
        {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          loading: false,
        });

        alert("Successfully updated 😊");

        this.props.history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
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
            <h1 className="header">Update Movie: {this.state.input.name}</h1>
            <div className="form-input">
              <label htmlFor="name" className="form-label">
                <span className="form-label-text">Name:</span>
                <input
                  onChange={this.inputChangeHandler}
                  className="form-text form-label-input"
                  placeholder="Enter Movie Name"
                  id="name"
                  value={this.state.input.name}
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
                  max={10}
                  min={1}
                  step={0.5}
                  value={this.state.input.rating}
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
                  value={this.state.input.releaseDate}
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
            <input className="button" type="submit" value="UPDATE" />
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
