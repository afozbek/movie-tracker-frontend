import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios-instance";

import Movie from "./Movie";
import Loading from "../../Util/Loading";
import Logout from "../Auth/Logout/Logout";

export default class Movies extends Component {
    state = {
        genreTypes: [
            { id: 1, value: "ALL MOVIES" },
            { id: 2, value: "COMEDY" },
            { id: 3, value: "ACTION" },
            { id: 4, value: "DRAMA" }
        ],
        movies: [],
        loading: true,
        input: {
            search_movie: "",
            search_genre: "ALL MOVIES"
        }
    };

    dropDownChangeHandler = e => {
        let value = e.target.value;
        let name = e.target.name;

        this.setState(prevState => ({
            ...prevState,
            directorId: "",
            input: {
                ...prevState.input,
                [name]: value
            }
        }));
    };

    inputChangeHandler = e => {
        let inputName = e.target.name;
        let value = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [inputName]: value
            }
        }));
    };

    searchMovieButtonHandler = e => {
        const jwttoken = localStorage.getItem("jwttoken");

        axios
            .get("/movies", {
                params: { movie: this.state.input.search_movie },
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({
                    movies: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    searchGenreButtonHandler = e => {
        const jwttoken = localStorage.getItem("jwttoken");

        const genre =
            this.state.input.search_genre === "ALL MOVIES"
                ? "ALL_MOVIES"
                : this.state.input.search_genre;

        axios
            .get("/movies", {
                params: { genre },
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({
                    movies: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        const jwttoken = localStorage.getItem("jwttoken");

        if (!jwttoken) {
            this.props.history.push("/login");
        }

        axios
            .get("/movies", {
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({ movies: res.data, loading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    err,
                    loading: false
                });
            });
    }

    render() {
        const movies = this.state.movies.map(movie => {
            return (
                <Movie {...this.props} key={movie.movieId} movieData={movie} />
            );
        });

        const movieTable = (
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ADD TO FAV LIST</th>

                        <th style={{ textAlign: "center" }}>
                            ADD TO WATCH LIST
                        </th>

                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Movie Name</th>
                        <th style={{ textAlign: "center" }}>Genre</th>
                        <th style={{ textAlign: "center" }}>IMDB Rating</th>
                        <th style={{ textAlign: "center" }}>Release Date</th>
                        <th style={{ textAlign: "center" }}>Director</th>
                        <th style={{ textAlign: "center" }}>Update</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                    </tr>
                </thead>

                <tbody>{movies}</tbody>
            </table>
        );

        const content = this.state.loading ? (
            <Loading />
        ) : (
            <div>
                <h1>Your Movies</h1>
                <div>{movieTable}</div>
                <Link to="/" style={{ marginTop: 30 }}>
                    Home Page
                </Link>
            </div>
        );

        const genreTypes = this.state.genreTypes.map(genre => (
            <option key={genre.id} value={genre.value}>
                {genre.value}
            </option>
        ));

        return (
            <Fragment>
                <Logout {...this.props} />
                <div className="search">
                    <div className="form-input">
                        <label htmlFor="search_movie" className="form-label">
                            <input
                                onChange={this.inputChangeHandler}
                                placeholder="Search movie by name..."
                                className="form-text"
                                id="search_movie"
                                type="text"
                                name="search_movie"
                            />
                        </label>
                    </div>
                    <button
                        className="button"
                        onClick={this.searchMovieButtonHandler}
                    >
                        SEARCH
                    </button>
                </div>
                <div className="search">
                    <div className="form-input">
                        <div className="form-input">
                            <label htmlFor="genreType" className="form-label">
                                <span className="form-label-text">
                                    Movie Genre:
                                </span>
                                <select
                                    onChange={this.dropDownChangeHandler}
                                    name="search_genre"
                                >
                                    {genreTypes}
                                </select>
                            </label>
                        </div>
                        {/* <label htmlFor="search_genre" className="form-label">
                            <input
                                onChange={this.inputChangeHandler}
                                placeholder="Search movie by genre..."
                                className="form-text"
                                id="search_genre"
                                type="text"
                                name="search_genre"
                            />
                        </label> */}
                    </div>
                    <button
                        className="button"
                        onClick={this.searchGenreButtonHandler}
                    >
                        SEARCH
                    </button>
                </div>
                <Link to="/add-movie">ADD A MOVIE</Link>
                {content}
            </Fragment>
        );
    }
}
