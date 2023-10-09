import React, { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }

    handleChange = () => {
        this.props.changeState(true, 'create');
    };

    handleUrlChange = () => {
        this.props.changeState(true, 'url');
    };

    render() {
        return (
            <nav className="navbar navbar-expand-sm">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <button className="btn btn-primary me-3" href="#" onClick={this.handleChange}>Create Short Url</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-primary me-3" href="#" onClick={this.handleUrlChange}>View Urls</button>
                    </li>
                </ul>
            </nav>
        );
    }
}