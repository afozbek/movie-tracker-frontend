import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import axios from "../../axios-instance";
import Director from "./Director";
import Loading from "../../Util/Loading";
import Logout from "../Auth/Logout/Logout";

export default class Directors extends Component {
    state = {
        directors: [],
        loading: true
    };

    componentDidMount() {
        const jwttoken = localStorage.getItem("jwttoken");

        if (!jwttoken) {
            this.props.history.push("/login");
        }

        axios
            .get("/admin/director", {
                headers: { Authorization: "Bearer " + jwttoken }
            })
            .then(res => {
                this.setState({ directors: res.data, loading: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    err,
                    loading: false,
                    message: "Maybe you don't have permission to access"
                });
            });
    }

    render() {
        const directors = this.state.directors.map(director => {
            return (
                <Director key={director.directorId} directorData={director} />
            );
        });

        const directorTable = (
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>MOVIES</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Surname</th>
                        <th style={{ textAlign: "center" }}>Birth Place</th>
                        <th style={{ textAlign: "center" }}>Birth Date</th>
                        <th style={{ textAlign: "center" }}>UPDATE </th>
                        <th style={{ textAlign: "center" }}>DELETE </th>
                    </tr>
                </thead>

                <tbody>{directors}</tbody>
            </table>
        );

        const content = this.state.loading ? (
            <Loading />
        ) : (
            <div>
                <h1>Your Directors</h1>
                <h2>{this.state.message}</h2>

                <div>{directorTable}</div>

                <Link to="/" style={{ marginTop: 30 }}>
                    Home Page
                </Link>
            </div>
        );

        return (
            <Fragment>
                <Logout {...this.props} />

                <Link to="/add-director">ADD A DIRECTOR</Link>

                {content}
            </Fragment>
        );
    }
}
