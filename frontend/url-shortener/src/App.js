import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.changeState.bind(this);
    this.state = {
      count: 0,
      showModal: false,
      showUrlModal: false
    };
  }

  changeState = (newShowModalValue, modalType) => {
    if (modalType == 'create') {
      console.log('is create');
      this.setState({ showModal: newShowModalValue });
    }
    else {
      console.log('is url');
      this.setState({ showUrlModal: newShowModalValue });
    }
  };


  render() {
    return (
      /* Split the page into 3 section (header, container, footer) */
      <div className="myStyle">
        <Header changeState={this.changeState} />
        <Footer />
      </div>
    );
  }
}