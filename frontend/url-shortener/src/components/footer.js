import React, { Component } from "react";

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer">
                <div className='text-center p-4 bg-dark'>
                    Developed by: Chong Wan Leng, Evon
                </div>
            </footer>
        );
    }
}