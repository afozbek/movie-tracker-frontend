import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import axios from "../../../axios-instance";

import Loading from "../../../Util/Loading";
import Logout from "../../Auth/Logout/Logout";
import Movie from "../../Movies/Movie";

export default class DirectorMovies extends Component {
    state = {
        directorsMovies: [],
        loading: true
    };

    componentDidMount() {
        const jwttoken = localStorage.getItem("jwttoken");

        if (!jwttoken) {
            this.props.history.push("/login");
        }

        const directorId = this.props.match.params.directorId;

        axios
            .get(`/admin/director/${directorId}/movies`, {
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({ directorsMovies: res.data, loading: false });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    message: "Maybe you don't have permission to access"
                });
            });
    }

    render() {
        const movies = this.state.directorsMovies.map(movie => {
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
                <h1 style={{ marginBottom: 20 }}>Your Director's Movies</h1>
                <div>
                    {this.state.directorsMovies.length === 0 ? (
                        <h1>Your director doesn't have movies</h1>
                    ) : (
                        movieTable
                    )}
                </div>
                <Link to="/" style={{ marginTop: 30 }}>
                    Home Page
                </Link>
            </div>
        );

        return (
            <Fragment>
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
                <Link to="/add-movie">ADD A MOVIE</Link>
                {content}
            </Fragment>
        );
    }
}
