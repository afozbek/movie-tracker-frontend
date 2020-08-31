import React, { Component } from "react";

import { Link } from "react-router-dom";
import Logout from "../Auth/Logout/Logout";

export default class MustAddDirector extends Component {
    addDirectorHandler = e => {
        this.props.history.push("/add-director");
    };

    render() {
        return (
            <div>
                <Logout {...this.props} />
                <Link to="/">HOME PAGE</Link>
                <h1>You must add director in order to create movie</h1>
                <button className="button" onClick={this.addDirectorHandler}>
                    ADD DIRECTOR NOW
                </button>
            </div>
        );
    }
}
