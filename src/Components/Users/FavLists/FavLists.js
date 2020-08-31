import React, { Component } from "react";
import Movie from "../../Movies/Movie";
import Loading from "../../../Util/Loading";

import { Link } from "react-router-dom";
import Logout from "../../Auth/Logout/Logout";

import axios from "../../../axios-instance";

export default class FavList extends Component {
    state = {
        favlist: [],
        movies: [],
        loading: true,
        input: {
            search: ""
        }
    };

    favRemoveButtonHandler = movieId => {
        const jwttoken = localStorage.getItem("jwttoken");

        console.log("FAV REMOVE HANDLER");

        if (!jwttoken) {
            this.props.history.push("/login");
        }

        const username = localStorage.getItem("username");

        axios
            .delete(`/${username}/favList/${movieId}`, {
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({
                    favlist: res.data
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

        const username = localStorage.getItem("username");

        axios
            .get(`/${username}/favList`, {
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({
                    favlist: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    }

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

    searchButtonHandler = e => {
        const jwttoken = localStorage.getItem("jwttoken");

        axios
            .get("/movies", {
                params: { movie: this.state.input.search },
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({
                    movies: res.data,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        const movies = this.state.favlist ? (
            this.state.favlist.map(movie => {
                return (
                    <Movie
                        {...this.props}
                        favRemoveButtonHandler={this.favRemoveButtonHandler}
                        isFav={true}
                        key={movie.movieId}
                        movieData={movie}
                    />
                );
            })
        ) : (
            <Loading />
        );

        const movieTable = this.state.favlist ? (
            this.state.favlist.length === 0 ? (
                <h1>You dont have movies</h1>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>
                                REMOVE FROM FAV LIST
                            </th>
                            <th style={{ textAlign: "center" }}>ID</th>
                            <th style={{ textAlign: "center" }}>Movie Name</th>
                            <th style={{ textAlign: "center" }}>Genre</th>
                            <th style={{ textAlign: "center" }}>IMDB Rating</th>
                            <th style={{ textAlign: "center" }}>Director</th>
                            <th style={{ textAlign: "center" }}>UPDATE</th>
                            <th style={{ textAlign: "center" }}>DELETE</th>
                        </tr>
                    </thead>

                    <tbody>{movies}</tbody>
                </table>
            )
        ) : null;

        const content = this.state.loading ? (
            <Loading />
        ) : (
            <div>
                <h1>Your FavList</h1>
                <div>{movieTable}</div>
                <Link to="/" style={{ marginTop: 30 }}>
                    Home Page
                </Link>
            </div>
        );

        return (
            <>
                <Logout {...this.props} />
                <div className="search">
                    <div className="form-input">
                        <label htmlFor="search" className="form-label">
                            <input
                                onChange={this.inputChangeHandler}
                                placeholder="Search..."
                                className="form-text"
                                id="search"
                                type="text"
                                name="search"
                            />
                        </label>
                    </div>
                    <button
                        className="button"
                        onClick={this.searchButtonHandler}
                    >
                        SEARCH
                    </button>
                </div>
                <Link to="/movies">MOVIES</Link>

                {content}
            </>
        );
    }
}
