import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link to="/" className="col s5 brand-logo center black-text"><i className="material-icons">code</i>App Name</Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export { navbar }
